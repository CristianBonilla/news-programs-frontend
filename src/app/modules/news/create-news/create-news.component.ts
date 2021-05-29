import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { emailValidator, onlyLetters, onlyNumbers } from '@helpers/validators/formats.validator';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { NewsActions, NewsRequest } from '@modules/news/models/news';
import { createNews, getAllPrograms } from '@modules/news/store/actions/news.actions';
import { NewsState } from '@modules/news/store/reducers/news.reducer';
import { getError, getPrograms, isLoadingCreated } from '@modules/news/store/selectors/news.selectors';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { count, filter, mergeAll, take, tap, withLatestFrom } from 'rxjs/operators';
import { DEFAULT_MODAL_OPTIONS } from 'src/app/models/modal';
import { APP_ROUTES } from 'src/app/models/routes';
import { CustomizeDropdownSelect, DropdownSelectStyle } from '@shared/components/dropdown-select';

const { HOME: ROUTES } = APP_ROUTES;

@Component({
  selector: 'np-create-news',
  templateUrl: './create-news.component.html',
  styles: []
})
export class CreateNewsComponent implements OnInit, AfterViewInit {
  private newsModal!: NgbModalRef;
  @ViewChild('newsTemplate')
  readonly newsTemplate!: TemplateRef<NgbActiveModal>;
  readonly newsForm = this.formBuilder.group({
    name: [ null ],
    lastName: [ null ],
    email: [ null ],
    phone: [ null ],
    program: [ null ],
    comment: [ null ]
  });
  readonly dropdownProgramsSelect: CustomizeDropdownSelect = {
    data: [],
    style: DropdownSelectStyle.Info,
    options: {
      noneSelectedText: 'Seleccionar un programa...',
      size: 5,
      liveSearch: true
    }
  };
  loading$!: Observable<boolean>;

  get name() {
    return this.newsForm.get('name') as FormControl;
  }

  get lastName() {
    return this.newsForm.get('lastName') as FormControl;
  }

  get email() {
    return this.newsForm.get('email') as FormControl;
  }

  get phone() {
    return this.newsForm.get('phone') as FormControl;
  }

  get program() {
    return this.newsForm.get('program') as FormControl;
  }

  get comment() {
    return this.newsForm.get('comment') as FormControl;
  }

  constructor(
    private formBuilder: FormBuilder,
    private modal: NgbModal,
    private router: Router,
    private store: Store<NewsState>,
    private toastr: ToastrService,
    private location: Location
  ) {
    this.name.setValidators([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      onlyLetters
    ]);
    this.lastName.setValidators([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      onlyLetters
    ]);
    this.email.setValidators([
      Validators.required,
      emailValidator
    ]);
    this.phone.setValidators([
      onlyNumbers,
      Validators.maxLength(10)
    ]);
    this.program.setValidators([
      Validators.nullValidator
    ]);
    this.comment.setValidators([
      Validators.nullValidator
    ]);
  }

  ngOnInit() {
    this.loading$ = this.store.select(isLoadingCreated);
    this.store.dispatch(getAllPrograms());
    this.loadDropdownProgramsItems();
  }

  ngAfterViewInit() {
    this.newsModal = this.modal.open(this.newsTemplate, DEFAULT_MODAL_OPTIONS);
    this.actionOnCompletion();
    this.onPopState();
  }

  dismiss(active: NgbActiveModal) {
    active.dismiss(null);
  }

  createNews(active: NgbActiveModal) {
    const program = this.program.value?.toString();
    const newsRequest: NewsRequest = {
      name: this.name.value,
      family_name: this.lastName.value,
      email: this.email.value,
      phone: this.phone.value,
      program,
      comment: this.comment.value
    };
    this.store.dispatch(createNews({ payload: newsRequest }));
    this.loading$.pipe(
      withLatestFrom(this.store.select(getError)),
      filter(([ loading, error ]) => !loading && !error),
      take(1)
    ).subscribe(_ => {
      active.close(NewsActions.CREATED);
      this.toastr.success('', 'Fin del registro');
    });
  }

  private loadDropdownProgramsItems() {
    const dropdownItems = this.dropdownProgramsSelect.data;
    const dropdownOptions = this.dropdownProgramsSelect.options;
    this.store.select(getPrograms).pipe(
      filter(programs => !!programs.length),
      take(1),
      mergeAll(),
      tap(({ id, name }) => dropdownItems.push({
        value: id,
        text: name
      })),
      count()
    ).subscribe(amount => {
      if (!amount) {
        dropdownOptions.noneSelectedText = 'No hay programas...';
        this.program.disable();
      }
    });
  }

  private actionOnCompletion() {
    this.newsModal.closed.pipe(
      filter<NewsActions>(state => state === NewsActions.CREATED),
      take(1)
    ).subscribe(_ => { /* this.store.dispatch(fetchAllNews()) */ });
    this.newsModal.hidden.pipe(take(1))
      .subscribe(_ => this.router.navigate([ ROUTES.NEWS.MAIN ]));
  }

  private onPopState() {
    this.router.events.pipe(
      withLatestFrom(this.loading$),
      filter(([ event ]) => event instanceof NavigationStart && event.navigationTrigger === 'popstate'),
      take(1)
    ).subscribe(([ _, loading ]) => {
      if (!loading) {
        this.newsModal.close(null);
      } else {
        this.router.navigateByUrl(this.router.url);
        this.location.go(this.router.url);
      }
    });
  }
}
