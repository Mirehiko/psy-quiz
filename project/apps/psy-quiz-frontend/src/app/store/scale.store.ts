import { Injectable } from '@angular/core';
import { ScaleResponseDto } from '@shared/dto';
import { AbstractStoreService } from '@store/abstract-store.service';

@Injectable()
export class ScaleStore extends AbstractStoreService<ScaleResponseDto> {}
