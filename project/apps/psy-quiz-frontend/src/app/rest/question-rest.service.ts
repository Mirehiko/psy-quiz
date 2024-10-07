import { Injectable } from '@angular/core';
import { BaseRestService } from './base-rest.service';

@Injectable()
export class QuestionRestService extends BaseRestService {
  protected apiUrl = 'question';
}
