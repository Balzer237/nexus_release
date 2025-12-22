import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RelationshipDocument } from './schema/relationship-schema';
import { userDocument } from './schema/user-schema';
import { UserRepositoryInterface } from 'src/module/user/domaine/repository/repositoryInterface';
import { UserEntity } from 'src/module/user/domaine/entities/userEntity';
import { CreateUserDto } from 'src/module/user/adapter/dto/entrant/create-user-dto';
import { filterUserDto } from 'src/module/user/adapter/dto/entrant/getUserDto';
import { UserMapper } from '../mapper/userMapper';
import { RelationMapper } from '../mapper/relationMapper';

@Injectable()
export class userMongooseRepositoryImplementation extends UserRepositoryInterface {
  constructor(
    @InjectModel('User') private readonly userModel: Model<userDocument>,
    @InjectModel('Relationship')
    private readonly userRelationship: Model<RelationshipDocument>,
  ) {
    super();
  }
  async createRelationship(data: {
    follower: any;
    following: any;
  }): Promise<any> {
    let relation;
    try {
      relation = await new this.userRelationship(data).save();
    } catch (error) {
      throw new InternalServerErrorException('internal erro ' + error + '');
    }
    return RelationMapper.DocumentToRelationshipEntity(relation);
  }
  async deleteRelationship(idRelation) {
    await this.userRelationship.findByIdAndDelete(idRelation).exec();
  }
  async getFollowerUser(userId): Promise<UserEntity[]> {
    const followers = await this.userRelationship
      .find({ following: userId })
      .populate('follower')
      .exec();

    return followers.map((r) =>  UserMapper.documentToEntity(r.follower));
  }

  async getFollowingUser(userId): Promise<UserEntity[]> {
    const followers = await this.userRelationship
      .find({ follower: userId })
      .populate('following')
      .exec();
    return followers.map((r) => UserMapper.documentToEntity(r.following));
  }
  async findRelation(currentUserId, userToUnfollowId) {
    const relations = await this.userRelationship.findOne({
      follower: currentUserId,
      following: userToUnfollowId,
    });
    return relations ? RelationMapper.DocumentToRelationshipEntity(relations) : null;
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await new this.userModel(createUserDto).save();
    return UserMapper.documentToEntity(user);
  }

  async findAll(meta: filterUserDto): Promise<any> {
    const metaData = meta.meta;
    const query: any = {};
    if (meta.value) {
      query.$text = { $search: meta.value };
    }
    const skip = (metaData.current_page - 1) * metaData.limit;
    const users = await this.userModel
      .find(query, meta.value ? { score: { $meta: 'textScore' } } : {})
      .skip(skip)
      .limit(metaData.limit)
      .sort(meta.value ? { score: { $meta: 'textScore' } } : { createdAt: -1 })
      .exec();
    const total = await this.userModel.countDocuments(query);
    const usersEntity = users.map(UserMapper.documentToEntity);
    return {
      users: usersEntity,
      total,
      page: metaData.current_page,
      limit: metaData.limit,
      totalPages: Math.ceil(total / metaData.limit),
    };
  }
  async findManyById(ids: string[]): Promise<UserEntity[]> {
    const docs = await this.userModel.find({ _id: { $in: ids } }).exec();
    return docs.map(UserMapper.documentToEntity);
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return UserMapper.documentToEntity(user);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userModel.findOne({ email }).exec();
    const data = user ? UserMapper.documentToEntity(user) : null;
    return data;
  }

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }

  softDelete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async save(user: any): Promise<UserEntity> {
    let updated;
    console.log('save user', user);
    try {
      updated = await this.userModel
        .findByIdAndUpdate(user._id, user, { new: true })
        .exec();
    } catch (error) {
      throw new InternalServerErrorException('Internal error ' + error + '');
    }

    if (!updated) {
      throw new Error(`User with id ${user.id} not found`);
    }

    return UserMapper.documentToEntity(updated);
  }
}
