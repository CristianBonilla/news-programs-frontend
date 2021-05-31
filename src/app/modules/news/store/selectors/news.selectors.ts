import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NewsState } from '@modules/news/store/reducers/news.reducer';
import { newsFeatureKey } from '@modules/news/store';

export const newsRootSelector = createFeatureSelector<NewsState>(newsFeatureKey);

export const getNews = createSelector(newsRootSelector, state => state.news);

export const getPrograms = createSelector(newsRootSelector, state => state.programs ?? []);

export const getError = createSelector(newsRootSelector, state => state.error);

export const isLoading = createSelector(newsRootSelector, state => state.loading);

export const isLoadingCreated = createSelector(newsRootSelector, state => state.loadingCreated);

export const getNewsById = (newsId: string) => createSelector(
  isLoading,
  getNews,
  (loading, news) => !loading ? news?.find(({ id }) => id === newsId) : null);

export const getNewsAmount = createSelector(
  isLoading,
  getNews,
  (loading, news) => !loading && !!news && !!news.length ? news.length : null
);
