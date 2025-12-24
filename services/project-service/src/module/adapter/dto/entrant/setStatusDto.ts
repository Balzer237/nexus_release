
export class SetStatusProjectDto {

  ownerId:string; // for owns validation

  participantId: string; // who are setting status
  projectId: string;
  status: number;
}
