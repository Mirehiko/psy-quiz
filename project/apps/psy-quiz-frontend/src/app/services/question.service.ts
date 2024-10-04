import { Injectable, inject } from '@angular/core';
import { QuestionRestService } from '../rest';
import { BaseService } from './base.service';

@Injectable()
export class QuestionService extends BaseService {
  protected api = inject(QuestionRestService);
}
