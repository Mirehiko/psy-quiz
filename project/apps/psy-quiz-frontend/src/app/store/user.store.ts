import { Injectable } from '@angular/core';
import { UserResponseDto } from '@common/dto';
import { AbstractStoreService } from './abstract-store.service';

@Injectable()
export class UserStore extends AbstractStoreService<UserResponseDto> {}
