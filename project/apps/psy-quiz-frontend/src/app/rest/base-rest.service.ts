import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { IResponse } from '@shared/interfaces';
import { Observable, from } from 'rxjs';
import { API_TOKEN } from '../api-token';

export abstract class BaseRestService<T> {
  protected baseUrl: string;
  protected http = inject(HttpClient);
  protected abstract apiUrl: string;
  protected apiToken = inject(API_TOKEN);

  constructor() {
    this.baseUrl = `${this.apiToken}/main`;
  }

  public getAll(): Observable<IResponse<T[]>> {
    return from(this.http.get<IResponse<T[]>>(`${this.baseUrl}/${this.apiUrl}/list`));
  }

  public getOne(id: string): Observable<IResponse<T>> {
    return from(this.http.get<IResponse<T>>(`${this.baseUrl}/${this.apiUrl}/${id}`));
  }

  public create(requestDto: any): Observable<IResponse<T>> {
    return from(this.http.post<IResponse<T>>(`${this.baseUrl}/${this.apiUrl}`, requestDto));
  }

  public update(id: string, requestDto: any): Observable<IResponse<T>> {
    return from(this.http.patch<IResponse<T>>(`${this.baseUrl}/${this.apiUrl}/${id}`, requestDto));
  }

  public remove(id: string): Observable<any> {
    return from(this.http.delete(`${this.baseUrl}/${this.apiUrl}/${id}`));
  }
}
