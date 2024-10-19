import { Injectable } from '@angular/core';
import { TestRunResponseDto } from '@shared/dto';
import { Observable, from } from 'rxjs';
import { BaseRestService } from './base-rest.service';

@Injectable()
export class RunRestService extends BaseRestService<TestRunResponseDto> {
  protected apiUrl = 'test-run';

  public start(id: string): Observable<any> {
    return from(this.http.patch(`${this.baseUrl}/${this.apiUrl}/${id}/start`, undefined));
  }

  public finish(id: string): Observable<any> {
    return from(this.http.patch(`${this.baseUrl}/${this.apiUrl}/${id}/finish`, undefined));
  }
}
