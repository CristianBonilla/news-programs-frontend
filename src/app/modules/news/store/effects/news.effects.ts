import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ErrorType } from '@modules/news/models/news';
import { NewsState } from '@modules/news/store/reducers/news.reducer';
import { NewsService } from '@modules/news/services/news/news.service';
import {
  createNews,
  createNewsFailure,
  createNewsSuccess,
  fetchAllNews,
  fetchAllNewsFailure,
  fetchAllNewsSuccess,
  fetchAllPrograms,
  fetchAllProgramsFailure,
  fetchAllProgramsSuccess,
  getAllNews,
  getAllPrograms
} from '@modules/news/store/actions/news.actions';
import { newsRootSelector } from '@modules/news/store/selectors/news.selectors';
import { EMPTY, of, timer, zip } from 'rxjs';
import { catchError, delay, filter, map, mergeMap, switchMap, take } from 'rxjs/operators';

export const DEFAULT_WAIT = 3000;

@Injectable()
export class NewsEffects {
  getNews$ = createEffect(() => this.actions$.pipe(
    ofType(getAllNews),
    mergeMap(props => zip(
      this.store.select(newsRootSelector).pipe(take(1)),
      of(props)
    )),
    filter(([ state ]) => !state.loading),
    mergeMap(([ { news, hasRequestedNews, error } ]) => {
      if (!hasRequestedNews || !news && !!error) {
        return of(fetchAllNews());
      }
      if (!!news && !news.length) {
        return of(fetchAllNewsFailure({
          error: {
            errorType: ErrorType.NoNews
          }
        }));
      }

      return EMPTY;
    })
  ));

  fetchNews$ = createEffect(() => this.actions$.pipe(
    ofType(fetchAllNews),
    switchMap(_ => {
      const news$ = this.service.fetchNews().pipe(
        delay(DEFAULT_WAIT),
        map(data => fetchAllNewsSuccess({ data })),
        catchError(httpError => {
          const error = httpError.error ?? httpError;

          return timer(DEFAULT_WAIT).pipe(
            mergeMap(_ => of(fetchAllNewsFailure({
              error: {
                ...error,
                errorType: null
              }
            })))
          );
        })
      );

      return news$;
    })
  ));

  getPrograms$ = createEffect(() => this.actions$.pipe(
    ofType(getAllPrograms),
    mergeMap(props => zip(
      this.store.select(newsRootSelector).pipe(take(1)),
      of(props)
    )),
    filter(([ state ]) => !state.loadingPrograms),
    mergeMap(([ { programs, hasRequestedPrograms, error } ]) => {
      if (!hasRequestedPrograms || !programs && !!error) {
        return of(fetchAllPrograms());
      }
      if (!!programs && !programs.length) {
        return of(fetchAllProgramsFailure({
          error: {
            errorType: ErrorType.NoPrograms
          }
        }));
      }

      return EMPTY;
    })
  ));

  fetchPrograms$ = createEffect(() => this.actions$.pipe(
    ofType(fetchAllPrograms),
    switchMap(_ => {
      const programs$ = this.service.fetchPrograms().pipe(
        map(data => fetchAllProgramsSuccess({ data })),
        catchError(httpError => {
          const error = httpError.error ?? httpError;

          return of(fetchAllNewsFailure({
            error: {
              ...error,
              errorType: null
            }
          }));
        })
      );

      return programs$;
    })
  ));

  createNews$ = createEffect(() => this.actions$.pipe(
    ofType(createNews),
    switchMap(({ payload }) => {
      const create$ = this.service.createNews(payload).pipe(
        delay(DEFAULT_WAIT),
        map(_ => createNewsSuccess()),
        catchError(httpError => {
          const error = httpError.error ?? httpError;

          return timer(DEFAULT_WAIT).pipe(
            mergeMap(_ => of(createNewsFailure({
              error: {
                ...error,
                errorType: ErrorType.NoCreated
              }
            })))
          );
        })
      );

      return create$;
    })
  ));

  constructor(
    private actions$: Actions,
    private store: Store<NewsState>,
    private service: NewsService
  ) { }
}
