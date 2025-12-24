import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryInterface } from '../domain/repository/repositoryInterface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('repositoryImplementation') private readonly repo:RepositoryInterface,
    private readonly jwtService: JwtService
  ) {}
  async execute({ email, password }: { email: string; password: string }) {
    const exist = await this.repo.getUserByEmail({email});
    if (!exist)
      throw new NotFoundException("this user doesn't exist or dedable account");

    const isCorrectPassword = await bcrypt.compare(exist.password, password);
    if (!isCorrectPassword) {
      throw new NotFoundException('This password is incorrect');
    }

    const token = await this.jwtService.sign(exist);
    return {
      id: exist.id,
      user: exist.username,
      email: exist.email,
      access_token: token,
    };
  }
}
