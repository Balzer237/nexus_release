import { CollaboratorRole } from "src/module/domaine/entities/projectEntity";

export class createCollaborationDto {
  user:any;
  projectId: string;

 
  senderId: string;

  receiverId: string;
  role: CollaboratorRole;
}
