import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import axios from '@nestjs/axios'

@Controller("gateway")
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

 
}
