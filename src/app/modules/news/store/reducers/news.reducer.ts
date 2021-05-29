import { NewsResponse, ProgramResponse } from '@modules/news/models/news';
import { Action, createReducer, on } from '@ngrx/store';
import {
  createNews,
  createNewsFailure,
  createNewsSuccess,
  fetchAllNews,
  fetchAllNewsFailure,
  fetchAllNewsSuccess,
  fetchAllPrograms,
  fetchAllProgramsFailure,
  fetchAllProgramsSuccess
} from '@modules/news/store/actions/news.actions';

export interface NewsState {
  news: NewsResponse[] | null;
  hasRequestedNews: boolean;
  programs: ProgramResponse[] | null;
  hasRequestedPrograms: boolean;
  error: any;
  loading: boolean;
  loadingPrograms: boolean;
  loadingCreated: boolean;
}

export const initialState: NewsState = {
  news: null,
  hasRequestedNews: false,
  programs: null,
  hasRequestedPrograms: false,
  error: null,
  loading: false,
  loadingPrograms: false,
  loadingCreated: false
};

const newsReducer = createReducer(
  initialState,
  on(fetchAllNews, state => ({
    ...state,
    loading: true,
    hasRequestedNews: true
  })),
  on(fetchAllNewsSuccess, (state, { data: news }) => ({
    ...state,
    news,
    loading: false
  })),
  on(fetchAllNewsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(fetchAllPrograms, state => ({
    ...state,
    loadingPrograms: true,
    hasRequestedPrograms: true
  })),
  on(fetchAllProgramsSuccess, (state, { data }) => {
    const programKeys: (keyof ProgramResponse)[] = [ 'id', 'name' ];
    let programs = data ?? [];
    for (const key of programKeys) {
      const mapper = new Map(programs.map(program => [ program[key], program ]))
        .values();
      programs = [ ...mapper ];
    }

    return {
      ...state,
      programs,
      loadingPrograms: false
    };
  }),
  on(fetchAllProgramsFailure, (state, { error }) => ({
    ...state,
    error,
    loadingPrograms: false
  })),
  on(createNews, state => ({
    ...state,
    loadingCreated: true
  })),
  on(createNewsSuccess, state => ({
    ...state,
    loadingCreated: false
  })),
  on(createNewsFailure, (state, { error }) => ({
    ...state,
    error,
    loadingCreated: false
  }))
);

export function reducer(state: NewsState | undefined, action: Action) {
  return newsReducer(state, action);
}
