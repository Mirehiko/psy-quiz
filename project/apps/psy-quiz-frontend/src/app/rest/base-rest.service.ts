import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, from } from 'rxjs';

export abstract class BaseRestService {
  protected baseUrl = 'http://localhost:5002/api/main';
  protected http = inject(HttpClient);
  protected abstract apiUrl: string;

  public getAll(): Observable<any> {
    return from(this.http.get<any>(`${this.baseUrl}/${this.apiUrl}/list`));
  }

  public getOne(id: string): Observable<any> {
    return from(this.http.get(`${this.baseUrl}/${this.apiUrl}/${id}`));
  }

  public create(requestDto: any): Observable<any> {
    return from(this.http.post(`${this.baseUrl}/${this.apiUrl}`, requestDto));
  }

  public remove(id: string): Observable<any> {
    return from(this.http.delete(`${this.baseUrl}/${this.apiUrl}/${id}`));
  }
}
