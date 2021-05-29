import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsRoutingModule } from '@modules/news/news-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { IconsModule } from '@shared/icons/icons.module';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { DirectivesModule } from '@directives/directives.module';
import { DropdownSelectModule } from '@shared/components/dropdown-select/dropdown-select.module';

import { NewsComponent } from '@modules/news/news.component';
import { NewsDetailsComponent } from '@modules/news/news-details/news-details.component';
import { CreateNewsComponent } from '@modules/news/create-news/create-news.component';
import { NewsBodyPipe } from '@modules/news/pipes/news-body/news-body.pipe';

import { NewsEffects } from '@modules/news/store/effects/news.effects';
import { newsFeatureKey, reducer as newsReducer } from '@modules/news/store';

@NgModule({
  declarations: [
    NewsComponent,
    NewsBodyPipe,
    NewsDetailsComponent,
    CreateNewsComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    EffectsModule.forFeature([ NewsEffects ]),
    StoreModule.forFeature(newsFeatureKey, newsReducer),
    IconsModule,
    OverlayscrollbarsModule,
    NgbModule,
    ReactiveFormsModule,
    NgxTrimDirectiveModule,
    DirectivesModule,
    DropdownSelectModule
  ]
})
export class NewsModule { }
