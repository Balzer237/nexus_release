import { ChapterSortantDto } from 'src/module/adapter/dto/sortant/AllDtoSortant.dto';
import { ChapterEntity } from '../../domaine/entities/chapter.entity';
import { Types } from 'mongoose';


export class ChapterMapper{ 

    static chapterToChapterDocument(chapter: ChapterEntity): any {
        return {
            _id: chapter.getId(),
            title: chapter.title,
            MediaCount: chapter.getMediaCount(),
            description: chapter.description,
            project: chapter.getProject(),
            userId: new Types.ObjectId(chapter.getParticipant()),
            organization: chapter.getOrganization(),
            status: chapter.getStatus(),
            publichedAt: chapter.publichedAt,
            createAt: chapter.createAt,
            updateAt: chapter.updateAt,
            statistique: chapter.getStatistique(),
        };
    }

    static chapterDocumentToChapter(chapterDoc: any): ChapterEntity {
        return new ChapterEntity({
            id: chapterDoc._id,
            title: chapterDoc.title,
            description: chapterDoc.description,
            project: chapterDoc.project,
            participant: chapterDoc.userId.toString(),

            statistique: chapterDoc.statistique,
            MediaCount: chapterDoc.MediaCount,
            organization: chapterDoc.organization,
            status: chapterDoc.status,
            publichedAt: chapterDoc.publichedAt,
            createAt: chapterDoc.createAt,
            updateAt: chapterDoc.updateAt,
        });
    };

    ChapterEntityToSortant(entity: ChapterEntity,
    ): ChapterSortantDto {
        return {
            id: entity.getId(),
            description: entity.description,
            title: entity.title,
            MediaCount: entity.getMediaCount(),
            project: entity.getProject(),
            participant: entity.getParticipant(),

            order: entity.getOrganization().order,

            status: entity.getStatus(),

            updateAt: entity.updateAt,
            createAt: entity.createAt,
            publichedAt: entity.publichedAt,
            commentCount: entity.getStatistique().commentCount,
            likeCount: entity.getStatistique().likeCount,
            shareCount: entity.getStatistique().shareCount,
            viewCount: entity.getStatistique().viewCount,
        };
    }

}


