import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MarckCommentAsResponseDto {
  @ApiProperty()
  @IsString()
  commentIs: string;

  @ApiProperty()
  @IsString()
  customerId: string;
}
