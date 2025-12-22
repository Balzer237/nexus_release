import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  username?: string;

  @IsString()
  email?: string;

  @IsString()
  password?: string;

  avatar_url?: string;
  bio?: string;
  skills?: string[];
}
