
export class CreateChapterDto {
  
  title: string;

  description: string;

  project: string;

  
  participantId: string;

  organization?: {
    order: number;
  };
}
