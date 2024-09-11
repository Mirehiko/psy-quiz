import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable()
export class UserRestService {
  private baseUrl = 'http://localhost:5002/api/main';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<any> {
    return from(this.http.get(`${this.baseUrl}/users`));
  }

  public getOne(id: string): Observable<any> {
    return from(this.http.get(`${this.baseUrl}/user/${id}`));
  }

  public create(id: string, requestDto: any): Observable<any> {
    return from(this.http.post(`${this.baseUrl}/user`, requestDto));
  }

  public suspend(id: string, requestDto: any): Observable<any> {
    return from(this.http.patch(`${this.baseUrl}/user/${id}`, requestDto));
  }

  public unsuspend(id: string, requestDto: any): Observable<any> {
    return from(this.http.patch(`${this.baseUrl}/user/${id}`, requestDto));
  }

  public remove(id: string): Observable<any> {
    return from(this.http.delete(`${this.baseUrl}/user/${id}`));
  }
}
