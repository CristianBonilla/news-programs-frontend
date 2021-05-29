export interface NewsRequest {
  name: string;
  family_name: string;
  email: string;
  phone: string;
  program: string;
  comment: string;
}

export interface NewsResponse {
  id: string;
  title: string;
  body: string;
}

export interface ProgramResponse {
  id: number;
  name: string;
}

export enum ErrorType {
  NoNews = 'NN',
  NoPrograms = 'NP',
  NoCreated = 'NC'
}

export enum NewsActions {
  CREATED,
  UPDATED,
  DELETED
}

