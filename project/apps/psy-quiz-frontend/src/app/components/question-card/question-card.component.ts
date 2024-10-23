import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, Input, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RunService } from '@services';
import { QuestionAnswerResponseDto, QuestionResponseDto, TestRunResponseDto } from '@shared/dto';
import { QuestionType } from '@shared/enums';

interface IAnswerForm {
  id: FormControl<string | undefined | null>;
  value: FormControl<string | null>;
}

@Component({
  selector: 'question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionCardComponent {
  @Input() public set run(run: TestRunResponseDto) {
    this._run = run;
    const currentAnswerId = run.answers?.find((a) => a.questionId === this._question.id);

    if (currentAnswerId) {
      this.form.controls.value.setValue(currentAnswerId.answer);
    }
    if (run.isFinished) {
      this.form.disable();
    }
    this.cdr.markForCheck();
  }
  @Input() public set question(question: QuestionResponseDto) {
    this._question = question;
    this.initForm(question);
    debugger;
  }

  public get question(): QuestionResponseDto {
    return this._question;
  }

  public questionType = QuestionType;
  public form: FormGroup<IAnswerForm>;
  public _run: TestRunResponseDto;
  private _question: QuestionResponseDto;
  private formBuilder = inject(FormBuilder);
  private runService = inject(RunService);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  public sendAnswer(answer: QuestionAnswerResponseDto): void {
    this.runService
      .sendAnswer(this._run.id, { questionId: this._question.id!, answer: answer.id! })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  private initForm(question: QuestionResponseDto) {
    this.form = this.formBuilder.group<IAnswerForm>({
      id: this.formBuilder.control<string>(question.id),
      value: this.formBuilder.control<string | null>(null)
    });
  }
}
