import { Injectable } from '@angular/core';
import { BaseRestService } from '@rest/base-rest.service';
import { ScaleAnswerResponseDto } from '@shared/dto';

@Injectable()
export class ScaleAnswerRestService extends BaseRestService<ScaleAnswerResponseDto> {
  protected apiUrl: 'scale-answer';
}
