import { Injectable } from '@nestjs/common';
import { UniverEntity } from './entities/universEntiy';

@Injectable()
export class DomaineService {
  CanCreateUniver(userLevel: any): boolean {
    
    if (userLevel != 'GARDIEN') {
      return false;
    }
    return true;
  }

  CanDeleteUniver(userId: string, univer: UniverEntity) {
    const cant: boolean = univer.getCreatedBy() == userId;
    return cant;
  }
  canUpdateUniver(userId: string, univer: UniverEntity): boolean {
    const cant = univer.getCreatedBy() == userId;
    return cant;
  }
}
