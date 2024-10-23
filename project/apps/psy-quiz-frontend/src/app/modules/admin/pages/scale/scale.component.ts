import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TestService } from '@services';
import { ScaleService } from '@services/scale.service';
import { QuestionResponseDto, ScaleRequestDto, ScaleResponseDto } from '@shared/dto';
import { QuestionStore, ScaleStore, TestStore } from '@store';
import { Observable, filter, switchMap, take, tap } from 'rxjs';

interface IScaleForm {
  name: FormControl<string | null>;
  description: FormControl<string | null>;
}

@Component({
  selector: 'scale',
  templateUrl: './scale.component.html',
  styleUrls: ['./scale.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScaleComponent {
  public scale: ScaleResponseDto;
  public form: FormGroup<IScaleForm>;
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private scaleStore = inject(ScaleStore);
  private testStore = inject(TestStore);
  private questionStore = inject(QuestionStore);
  private testService = inject(TestService);
  private scaleService = inject(ScaleService);
  private formBuilder = inject(FormBuilder);

  // private scaleService = inject(ScaleService);
  public questions: QuestionResponseDto[];

  constructor() {
    this.form = this.formBuilder.group<IScaleForm>({
      name: new FormControl(null),
      description: new FormControl(null)
    });

    this.wrapQuery(
      this.testStore.entity$.pipe(
        filter((test) => test !== undefined),
        switchMap((test) => this.testService.getQuestions(test.id))
      )
    ).subscribe();

    this.wrapQuery(this.questionStore.entities$)
      .pipe(filter((scale) => scale !== undefined))
      .subscribe((test) => {
        this.questions = test;
        this.cdr.markForCheck();
      });

    this.wrapQuery(this.scaleStore.entity$)
      .pipe(filter((scale) => scale !== undefined))
      .subscribe((scale) => {
        this.scale = scale;
        this.form.controls.name.setValue(scale.name);
        this.form.controls.description.setValue(scale.description || '');
        this.cdr.markForCheck();
      });
  }

  public saveScale(): void {
    const requestDto: ScaleRequestDto = {
      name: this.form.controls.name.value!,
      description: this.form.controls.description.value!
    };
    this.wrapQuery(this.scaleService.update<ScaleRequestDto>(this.scale.id, requestDto)).subscribe();
  }

  private wrapQuery<T>(observable: Observable<T>): Observable<T> {
    return observable.pipe(takeUntilDestroyed(this.destroyRef));
  }
}
