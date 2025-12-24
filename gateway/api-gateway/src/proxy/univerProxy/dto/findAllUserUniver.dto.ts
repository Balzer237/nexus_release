import { ApiProperty } from '@nestjs/swagger';

export class FindAllUserUniversDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty({ required: false })
  searchTerm?: string;
}
