import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({ description: 'page actuelle' })
  current_page: number;

  @ApiProperty({ description: "Nombre d'element par page" })
  limit: number;
}
