import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { BaseRestService } from './base-rest.service';

@Injectable()
export class TestRestService extends BaseRestService {
  protected apiUrl = 'test';

  public suspend(id: string, requestDto: any): Observable<any> {
    return from(this.http.patch(`${this.baseUrl}/${this.apiUrl}/${id}`, requestDto));
  }

  public unsuspend(id: string, requestDto: any): Observable<any> {
    return from(this.http.patch(`${this.baseUrl}/${this.apiUrl}/${id}`, requestDto));
  }
}
