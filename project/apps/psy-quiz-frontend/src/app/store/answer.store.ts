import { Injectable } from '@angular/core';
import { QuestionAnswerResponseDto } from '@shared/dto';
import { AbstractStoreService } from './abstract-store.service';

@Injectable()
export class AnswerStore extends AbstractStoreService<QuestionAnswerResponseDto> {}
