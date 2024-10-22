import { Injectable } from '@angular/core';
import { BaseRestService } from '@rest/base-rest.service';
import { CriterionRequestDto } from '@shared/dto';

@Injectable()
export class CriteriaRestService extends BaseRestService<CriterionRequestDto> {
  protected apiUrl: 'criterion';
}
