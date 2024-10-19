import { Injectable } from '@angular/core';
import { QuestionResponseDto } from '@shared/dto';
import { AbstractStoreService } from './abstract-store.service';

@Injectable()
export class QuestionStore extends AbstractStoreService<QuestionResponseDto> {}
