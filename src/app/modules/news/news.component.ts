import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NewsState } from '@modules/news/store/reducers/news.reducer';
import { DEFAULT_SCROLLBAR_OPTIONS, ScrollbarOptions } from 'src/app/models/scrollbar';
import { getAllNews } from '@modules/news/store/actions/news.actions';
import { getError, getNews, getNewsAmount, isLoading } from '@modules/news/store/selectors/news.selectors';
import { ErrorType, NewsResponse } from '@modules/news/models/news';
import { distinctUntilChanged, filter, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from 'src/app/models/routes';

const { HOME: { NEWS: ROUTES } } = APP_ROUTES;

@Component({
  selector: 'np-news',
  templateUrl: './news.component.html',
  styleUrls: [ './news.component.scss' ]
})
export class NewsComponent implements OnInit, AfterViewInit {
  readonly scrollbarOptions: ScrollbarOptions = {
    ...DEFAULT_SCROLLBAR_OPTIONS,
    overflowBehavior: {
      y: 'visible-hidden'
    }
  };
  readonly ROUTES = ROUTES;
  loading$!: Observable<boolean>;
  news$!: Observable<NewsResponse[] | null>;
  failedSubscriptions: Subscription[] = [];

  constructor(private store: Store<NewsState>, private toastr: ToastrService) { }

  ngOnInit() {
    this.loading$ = this.store.select(isLoading);
    this.news$ = this.store.select(getNews);
    this.store.dispatch(getAllNews());
    this.loadSuccess();
  }

  ngAfterViewInit() {
    this.hasError();
  }

  trackByNews(index: number, newsResponse: NewsResponse) {
    return `${ index }-${ newsResponse.id }`;
  }

  private loadSuccess() {
    this.store.select(getNewsAmount).pipe(
      filter(amount => !!amount),
      take(1))
    .subscribe(amount => {
      this.toastr.success(`${ amount } en total`, 'Se cargaron las noticias!');
    });
  }

  private hasError() {
    const subscriptions = this.store.select(getError).pipe(
      distinctUntilChanged(),
      filter(error => !!error)
    ).subscribe(error => {
      this.onError(error.errorType);
    });
    this.failedSubscriptions.push(subscriptions);
  }

  private async onError(errorType: ErrorType) {
    switch (errorType) {
      case ErrorType.NoNews:
        this.toastr.info('', 'No hay noticias registradas');
        return;
      case ErrorType.NoPrograms:
        this.toastr.info('', 'No hay programas disponibles');
        return;
      case ErrorType.NoCreated:
        this.toastr.error('El registro no fue realizado con éxito', 'Se produjo un error');
        return;
      default:
        this.toastr.error('Inténtalo de nuevo más tarde', 'Se produjo un error');
        return;
    }
  }
}
