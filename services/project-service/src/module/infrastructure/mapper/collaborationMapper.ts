import { CollaborationSortantDto } from 'src/module/adapter/dto/sortant/AllDtoSortant.dto';
import { Collaboration } from '../../domaine/entities/collaboration.entity';


export class CollaborationMapper{

static CollaborationEntityToDocument(collab: Collaboration) {
  return {
    _id: collab.getId(),
    status: collab.getStatus(),
    role: collab.getRole(),
    respondedAt: collab.respondedAt,
  };
}

static collaborationDocumentToCollaborationEntity(
  document: any,
): Collaboration {
  return new Collaboration({
    id: document._id,
    project: document.projectId,
    sender: document.senderId,
    status: document.status,
    role: document.role,
    receiver: document.receiverId,
    invitedAt: document.invitedAt,
    respondedAt: document.respondedAt,
    expiredAt: document.expiredAt,
  });
}

staticCollaborationEntityToSortant(
  entity: Collaboration,
): CollaborationSortantDto {
  return {
    id: entity.getId(),
    project: entity.getProject(),
    sender: entity.getInvitedBy(),
    status: entity.getStatus(),
    receiver: entity.getUserId(),
    role: entity.getRole(),
    invitedAt: entity.invitedAt,
    respondedAt: entity.respondedAt,
    expiredAt: entity.expiredAt,
  };
}

}