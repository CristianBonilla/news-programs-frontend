import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewsRequest, NewsResponse, ProgramResponse } from '@modules/news/models/news';
import { ENDPOINTS } from 'src/app/models/endpoints';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private readonly httpHeaderOptions: HttpHeaders;
  private readonly newsEndpointUrl = ENDPOINTS.NEWS;

  constructor(private http: HttpClient) {
    this.httpHeaderOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  fetchNews() {
    const news$ = this.http.get<NewsResponse[]>(this.newsEndpointUrl.ALL, {
      responseType: 'json',
      ...this.httpHeaderOptions
    });

    return news$;
  }

  fetchPrograms() {
    const programs$ = this.http.get<ProgramResponse[]>(this.newsEndpointUrl.PROGRAMS, {
      responseType: 'json',
      ...this.httpHeaderOptions
    });

    return programs$;
  }

  createNews(newsRequest: NewsRequest) {
    const create$ = this.http.post<void>(this.newsEndpointUrl.CREATE, newsRequest, {
      responseType: 'json',
      ...this.httpHeaderOptions
    });

    return create$;
  }
}
