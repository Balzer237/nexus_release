export enum LevelUser {
  NOVICE = 'NOVICE',
  ACTIF = 'ACTIF',
  EXPERT = 'EXPERT',
  GARDIEN = 'GARDIEN',
}

export type MediaType = {
  filename: string;
  type: any;
  originalName: string;
  size: any;
  storagePath: string;
  format: string;
};
