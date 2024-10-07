import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { BaseRestService } from './base-rest.service';

@Injectable()
export class RunRestService extends BaseRestService {
  protected apiUrl = 'test-run';

  public start(id: string): Observable<any> {
    return from(this.http.patch(`${this.baseUrl}/${this.apiUrl}/${id}/start`, undefined));
  }

  public finish(id: string): Observable<any> {
    return from(this.http.patch(`${this.baseUrl}/${this.apiUrl}/${id}/finish`, undefined));
  }
}
