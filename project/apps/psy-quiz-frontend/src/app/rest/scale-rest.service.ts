import { Injectable } from '@angular/core';
import { BaseRestService } from '@rest/base-rest.service';
import { ScaleResponseDto } from '@shared/dto';

@Injectable()
export class ScaleRestService extends BaseRestService<ScaleResponseDto> {
  protected apiUrl = 'scale';
}
