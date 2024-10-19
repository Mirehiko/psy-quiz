import { Injectable } from '@angular/core';
import { UserResponseDto } from '@common/dto';
import { IResponse } from '@shared/interfaces';
import { Observable, from } from 'rxjs';
import { BaseRestService } from './base-rest.service';

@Injectable()
export class UserRestService extends BaseRestService<UserResponseDto> {
  protected apiUrl = 'user';

  public suspend(id: string, requestDto: any): Observable<IResponse<Boolean>> {
    return from(this.http.patch<IResponse<Boolean>>(`${this.baseUrl}/${this.apiUrl}/${id}`, requestDto));
  }

  public unsuspend(id: string, requestDto: any): Observable<IResponse<Boolean>> {
    return from(this.http.patch<IResponse<Boolean>>(`${this.baseUrl}/${this.apiUrl}/${id}`, requestDto));
  }
}
