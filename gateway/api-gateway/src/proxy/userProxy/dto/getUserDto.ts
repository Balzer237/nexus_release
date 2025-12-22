import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from './pagination-dto';

export class filterUserDto {
  @ApiProperty({ description: 'Valeur de filtrage' })
  value?: string | number;

  @ApiProperty({ description: 'Meta données de pagination' })
  meta: PaginationDto;
}
