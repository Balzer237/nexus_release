import { stateCollaboration } from "src/module/domaine/entities/collaboration.entity";

export class ChangeStatusCollaborationDto {

  id: string;

  senderId: string;

  status: stateCollaboration;
}
