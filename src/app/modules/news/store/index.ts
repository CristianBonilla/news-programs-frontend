import { ActionReducer } from '@ngrx/store';
import { NewsState, reducer as newsReducer } from '@modules/news/store/reducers/news.reducer';

export const newsFeatureKey = 'news';

export const reducer: ActionReducer<NewsState> = newsReducer;
