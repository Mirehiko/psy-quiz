import { Injectable } from '@angular/core';
import { TestRunResponseDto } from '@shared/dto';
import { AbstractStoreService } from './abstract-store.service';

@Injectable()
export class RunStore extends AbstractStoreService<TestRunResponseDto> {}
