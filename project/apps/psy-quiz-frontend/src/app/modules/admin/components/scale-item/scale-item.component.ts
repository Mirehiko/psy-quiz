import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ScaleStore } from '@store';

@Component({
  selector: 'scale-item',
  templateUrl: './scale-item.component.html',
  styleUrls: ['./scale-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScaleItemComponent {
  private formGroup: FormGroup;
  private formBuilder = inject(FormBuilder);
  private scaleStore = inject(ScaleStore);

  constructor() {}
}
