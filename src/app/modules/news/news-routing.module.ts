import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from '@modules/news/news.component';
import { CreateNewsComponent } from '@modules/news/create-news/create-news.component';
import { NewsDetailsComponent } from '@modules/news/news-details/news-details.component';

const routes: Routes = [
  {
    path: '',
    component: NewsComponent,
    children: [
      {
        path: 'create',
        component: CreateNewsComponent
      },
      {
        path: 'details/:newsId',
        component: NewsDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class NewsRoutingModule { }
