import { Injectable, inject } from '@angular/core';
import { ScaleRestService } from '@rest';
import { BaseService } from '@services/base.service';
import { ScaleResponseDto } from '@shared/dto';
import { ScaleStore } from '@store';

@Injectable()
export class ScaleService extends BaseService<ScaleResponseDto> {
  protected api = inject(ScaleRestService);
  protected store = inject(ScaleStore);
}
