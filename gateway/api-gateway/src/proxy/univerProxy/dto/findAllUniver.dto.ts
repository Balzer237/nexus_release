import { ApiProperty } from '@nestjs/swagger';

export class FindAllUniversDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty({ required: false })
  searchTerm?: string;
}
