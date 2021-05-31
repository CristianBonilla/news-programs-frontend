import { NewsRequest, NewsResponse, ProgramResponse } from '@modules/news/models/news';
import { createAction, props } from '@ngrx/store';

export enum NEWS_ACTIONS {
  GET_ALL_NEWS = '[News/Store] Get All News',
  FETCH_ALL_NEWS = '[News/API] Fetch All News',
  FETCH_ALL_NEWS_FAILURE = '[News/API] Fetch All News Failure',
  FETCH_ALL_NEWS_SUCCESS = '[News/API] Fetch All News Success',
  GET_ALL_PROGRAMS = '[News/Store] Get All News Programs',
  FETCH_ALL_PROGRAMS = '[News/API] Fetch All News Programs',
  FETCH_ALL_PROGRAMS_FAILURE = '[News/API] Fetch All News Programs Failure',
  FETCH_ALL_PROGRAMS_SUCCESS = '[News/API] Fetch All News Programs Success',
  CREATE_NEWS = '[News/API] Create News',
  CREATE_NEWS_FAILURE = '[News/API] Create News Failure',
  CREATE_NEWS_SUCCESS = '[News/API] Create News Success'
}

export const getAllNews = createAction(NEWS_ACTIONS.GET_ALL_NEWS);
export const fetchAllNews = createAction(NEWS_ACTIONS.FETCH_ALL_NEWS);
export const fetchAllNewsFailure = createAction(
  NEWS_ACTIONS.FETCH_ALL_NEWS_FAILURE,
  props<{ error: any }>()
);
export const fetchAllNewsSuccess = createAction(
  NEWS_ACTIONS.FETCH_ALL_NEWS_SUCCESS,
  props<{ data: NewsResponse[] }>()
);

export const getAllPrograms = createAction(NEWS_ACTIONS.GET_ALL_PROGRAMS);
export const fetchAllPrograms = createAction(NEWS_ACTIONS.FETCH_ALL_PROGRAMS);
export const fetchAllProgramsFailure = createAction(
  NEWS_ACTIONS.FETCH_ALL_PROGRAMS_FAILURE,
  props<{ error: any }>()
);
export const fetchAllProgramsSuccess = createAction(
  NEWS_ACTIONS.FETCH_ALL_PROGRAMS_SUCCESS,
  props<{ data: ProgramResponse[] }>()
);

export const createNews = createAction(
  NEWS_ACTIONS.CREATE_NEWS,
  props<{ payload: NewsRequest }>()
);
export const createNewsFailure = createAction(
  NEWS_ACTIONS.CREATE_NEWS_FAILURE,
  props<{ error: any }>()
);
export const createNewsSuccess = createAction(NEWS_ACTIONS.CREATE_NEWS_SUCCESS);
