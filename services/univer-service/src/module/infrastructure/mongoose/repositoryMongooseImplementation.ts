import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';

import { ParticipantDocument } from './schema/participantSchema';
import { UniverDocumen } from './schema/universSchema';
import { UniverEntity, univerStatus } from 'src/module/domaine/entities/universEntiy';
import { ParticipentEntity } from 'src/module/domaine/entities/participantEntity';
import { RepositoryInterface } from 'src/module/domaine/repository/repositoryInterface';
import { ParticipantMapper } from '../mapper/participantMapper';
import { UniverMapper } from '../mapper/univerMapper';
import { FindAllUserUniversDto } from 'src/module/adapter/dto/entrant/findAllUserUniver.dto';
import { FindAllUniversDto } from 'src/module/adapter/dto/entrant/findAllUniver.dto';

export type UniverResponse = {
  total: number;
  limit: number;
  totalPage: number;
  currentPage: number;
  data: UniverEntity[] | ParticipentEntity[];
};
@Injectable()
export class RepositoryMongooseImplementation extends RepositoryInterface {
  constructor(
    @InjectModel('Univers')
    private readonly Universdocument: Model<UniverDocumen>,
    @InjectModel('Participant')
    private readonly ParticipentModel: Model<ParticipantDocument>,
  ) {
    super();
  }

  async findParticipantByUserAndUniver(
    userId: string,
    univerId: string,
  ): Promise<ParticipentEntity | null> {
    let participant;

    try {
      participant = await this.ParticipentModel.findOne({
        userId: new Types.ObjectId(userId),
        univerId: new Types.ObjectId(univerId),
      }).exec();
    } catch (error) {
      throw new InternalServerErrorException('Internal error ' + error + '');
    }
    return participant ? ParticipantMapper.ParticipantDocumentToParticipant(participant) : null;
  }

  async saveParticipant(data: any): Promise<any> {
    let participant;
    try {
      participant = await this.ParticipentModel.findByIdAndUpdate(
        data._id,
        data,
        {
          new: true,
        },
      );
    } catch (error) {
      throw new InternalServerErrorException('Internal erro' + error + '');
    }

    return ParticipantMapper.ParticipantDocumentToParticipant(participant);
  }

  async saveUniver(data: any): Promise<any> {
    let univer;
    try {
      univer = await this.Universdocument.findByIdAndUpdate(data._id, data, {
        new: true,
      });
    } catch (error) {
      throw new InternalServerErrorException('Internal erro' + error + '');
    }

    return UniverMapper.UniverDocumenToUniver(univer);
  }

  async rejoindreUnivers(
    data: any,
    options?: { session?: ClientSession },
  ): Promise<any> {
    let joiner;
    try {
      joiner = await new this.ParticipentModel(
        data,
        options?.session ? { session: options.session } : {},
      ).save();
    } catch (error) {
      throw new InternalServerErrorException('Internal Error' + error + '');
    }
    return ParticipantMapper.ParticipantDocumentToParticipant(joiner);
  }
  async createDefi(data: any): Promise<any> {}

  async getAllUniverUserJoined(
    data: FindAllUserUniversDto,
  ): Promise<UniverResponse> {
    const skip = (data.page - 1) * data.limit;

    const pipeline: any[] = [
      {
        $match: {
          userId: data.userId,
        },
      },
      {
        $lookup: {
          from: 'univers',
          localField: 'univerId',
          foreignField: '_id',
          as: 'univer',
        },
      },

      // 2️⃣ On déplie le tableau "univer"
      { $unwind: '$univer' },
      {
        $match: {
          'univer.status': { $ne: univerStatus.DELETE },
        },
      },
    ];

    if (data.searchTerm) {
      pipeline.push({ $sort: { createdAt: -1 } });
      // pipeline.push({
      //   $match: {
      //     $text: { $search: data.searchTerm },
      //   },
      // });

      // pipeline.push({
      //   $addFields: {
      //     'univer.score': { $meta: 'textScore' },
      //   },
      // });

      // pipeline.push({
      //   $sort: { 'univer.score': { $meta: 'textScore' } },
      // });
    } else {
      pipeline.push({ $sort: { createdAt: -1 } });
    }

    pipeline.push({ $skip: Number(skip) }, { $limit: Number(data.limit) });

    pipeline.push({
      $replaceRoot: { newRoot: '$univer' },
    });

    let allUnivers;
    try {
      allUnivers = await this.ParticipentModel.aggregate(pipeline);
    } catch (error) {
      throw new InternalServerErrorException('Internal error ' + error + '');
    }
    console.log('allUniver', allUnivers);

    const countPipeline = pipeline.filter(
      (stage: any) => !('$skip' in stage || '$limit' in stage),
    );
    countPipeline.push({ $count: 'total' });

    const countResult = await this.ParticipentModel.aggregate(countPipeline);
    const totalDocument = countResult[0]?.total || 0;

    const response: UniverResponse = {
      data: allUnivers.map(UniverMapper.UniverDocumenToUniver),
      limit: data.limit,
      currentPage: data.page,
      total: totalDocument,
      totalPage: Math.ceil(totalDocument / data.limit),
    };

    return response;
  }

  async getAllUnivers(data: FindAllUniversDto): Promise<UniverResponse> {
    const query: any = {
      status: { $ne: univerStatus.DELETE },
    };
    if (data.searchTerm) {
      query.$text = { $search: data.searchTerm };
    }
    const skip = (data.page - 1) * data.limit;
    const allUnivers = await this.Universdocument.find(
      query,
      data.searchTerm ? { score: { $meta: 'textScore' } } : {},
    )
      .sort(
        data.searchTerm ? { score: { $meta: 'textScore' } } : { createdAt: -1 },
      )
      .skip(skip)
      .limit(data.limit)
      .exec();
    const total = await this.Universdocument.find(
      query,
      data.searchTerm ? { score: { $meta: 'textScore' } } : {},
    ).countDocuments();
    const response: UniverResponse = {
      limit: data.limit,
      currentPage: data.page,
      total,
      totalPage: Math.ceil(total / data.limit),
      data: allUnivers.map(UniverMapper.UniverDocumenToUniver),
    };
    return response;
  }
  async getPopulareUniver(data: any): Promise<any> {}

  async createUniver(
    data: any,
    options?: { session?: ClientSession },
  ): Promise<UniverEntity> {
    let univers;
    try {
      univers = await new this.Universdocument(
        data,
        options?.session ? { session: options.session } : {},
      ).save();
    } catch (error) {
      throw new InternalServerErrorException('Internal Error' + error + '');
    }
    return UniverMapper.UniverDocumenToUniver(univers);
  }

  async getUniverById(idUniver: string): Promise<any> {
    const univer = await this.Universdocument.findById(idUniver).exec();
    return univer ? UniverMapper.UniverDocumenToUniver(univer) : null;
  }
  async getParticipantById(id: string): Promise<ParticipentEntity | null> {
    let response;
    try {
      response = await this.ParticipentModel.findById(id).exec();
    } catch (error) {
      throw new InternalServerErrorException('Interna error ' + error + '');
    }
    return response ? ParticipantMapper.ParticipantDocumentToParticipant(response) : null;
  }
}
