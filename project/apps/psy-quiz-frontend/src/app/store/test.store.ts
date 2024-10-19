import { Injectable } from '@angular/core';
import { TestResponseDto } from '@shared/dto';
import { AbstractStoreService } from './abstract-store.service';

@Injectable()
export class TestStore extends AbstractStoreService<TestResponseDto> {}
