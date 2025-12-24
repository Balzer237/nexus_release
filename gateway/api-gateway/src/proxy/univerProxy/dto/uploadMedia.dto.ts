import { ApiProperty } from '@nestjs/swagger';

export class uploadMediaDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
