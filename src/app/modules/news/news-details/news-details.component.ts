import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { NewsState } from '@modules/news/store/reducers/news.reducer';
import { NewsResponse } from '@modules/news/models/news';
import { getNewsById } from '@modules/news/store/selectors/news.selectors';
import { of, throwError } from 'rxjs';
import { filter, mergeMap, take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { DEFAULT_MODAL_OPTIONS } from 'src/app/models/modal';
import { APP_ROUTES } from 'src/app/models/routes';

const { HOME: ROUTES } = APP_ROUTES;

@Component({
  selector: 'np-news-details',
  templateUrl: './news-details.component.html',
  styles: []
})
export class NewsDetailsComponent implements OnInit, AfterViewInit {
  private newsModal!: NgbModalRef;
  private newsId!: string;
  @ViewChild('newsTemplate')
  readonly newsTemplate!: TemplateRef<NgbActiveModal>;
  news!: NewsResponse;

  constructor(
    private modal: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<NewsState>,
    private toastr: ToastrService
  ) { }

  get newsBodyText() {
    const body = this.news?.body?.trim();

    return !!body ? body : 'Sin Descripción';
  }

  ngOnInit() {
    const { params: { newsId } } = this.route.snapshot;
    this.newsId = newsId;
  }

  ngAfterViewInit() {
    if (!this.newsId || !!this.newsId && !this.newsId.trim()) {
      this.giveBack();

      return;
    }
    this.fetchNews().subscribe(news => {
      this.news = news;
      this.newsModal = this.modal.open(this.newsTemplate, DEFAULT_MODAL_OPTIONS);
      this.actionOnCompletion();
      this.onPopState();
    }, _ => {
      this.giveBack();
      this.toastr.error('No se obtuvo el detalle de la noticia, inténtalo más tarde', 'Se produjo un error');
    });
  }

  close(active: NgbActiveModal) {
    active.close(null);
  }

  private fetchNews() {
    const news$ = this.store.select(getNewsById(this.newsId)).pipe(
      filter(news => !!news),
      mergeMap(news => !!news ? of(news) : throwError(null)),
      take(1)
    );

    return news$;
  }

  private actionOnCompletion() {
    this.newsModal.hidden.pipe(take(1)).subscribe(_ => this.giveBack());
  }

  private giveBack() {
    this.router.navigate([ ROUTES.NEWS.MAIN ]);
  }

  private onPopState() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart && event.navigationTrigger === 'popstate'),
      take(1)
    ).subscribe(_ => this.newsModal.close(null));
  }
}
