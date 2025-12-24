  import { MediaSortantDto } from 'src/module/adapter/dto/sortant/AllDtoSortant.dto';
import { MediaEntity } from '../../domaine/entities/media.entity';
import { Types } from 'mongoose';

export class MediaMapper{
  
static mediaToMediaDocument(media: MediaEntity): any {
  return {
    _id: media.getId(),
    chapter: media.chapter,
    project: media.project,
    uploadedBy: new Types.ObjectId(media.getUploadedBy()),
    filename: media.filename,
    originalName: media.originalName,
    title: media.title,
    description: media.description,
    type: media.type,
    dimention: media.dimention,
    size: media.size,
    storagePath: media.storagePath,
    duration: media.duration,
    thumbnails: media.thumbnails,
    format: media.format,
    createAt: media.createAt,
    updateAt: media.updateAt,
  };
}

static mediaDocumentToMedia(mediaDoc: any): MediaEntity {
  return new MediaEntity({
    id: mediaDoc._id,
    chapter: mediaDoc.chapter,
    project: mediaDoc.project,
    uploadedBy: mediaDoc.uploadedBy.toString(),
    filename: mediaDoc.filename,
    originalName: mediaDoc.originalName,
    title: mediaDoc.title,
    description: mediaDoc.description,
    type: mediaDoc.type,
    dimention: mediaDoc.dimention,
    size: mediaDoc.size,
    storagePath: mediaDoc.storagePath,
    duration: mediaDoc.duration,
    thumbnails: mediaDoc.thumbnails,
    format: mediaDoc.format,
    createAt: mediaDoc.createAt,
    updateAt: mediaDoc.updateAt,
  });
}

static MediaEntityToSortant(entity: MediaEntity): MediaSortantDto {
  return {
    id: entity.getId(),

    chapter: entity.chapter,
    project: entity.project,
    uploadedBy: entity.getUploadedBy(),

    filename: entity.filename,
    originalName: entity.originalName,

    title: entity.title,
    description: entity.description,
    type: entity.type,

    dimention: entity.dimention,

    size: entity.size,
    storagePath: entity.storagePath,
    duration: entity.duration,
    thumbnails: entity.thumbnails,
    format: entity.format,

    createAt: entity.createAt,
    updateAt: entity.updateAt,
  };
}

}