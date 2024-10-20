import { Component, Input, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionResponseDto } from '@shared/dto';
import { QuestionType } from '@shared/enums';

interface IAnswerForm {
  id: FormControl<string | undefined | null>;
  value: FormControl<string | null>;
}

@Component({
  selector: 'question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent {
  @Input() public set question(question: QuestionResponseDto) {
    this._question = question;
    this.initForm(question);
  }
  public get question(): QuestionResponseDto {
    return this._question;
  }

  public questionType = QuestionType;
  public formArray: FormArray<FormGroup<IAnswerForm>>;
  private _question: QuestionResponseDto;
  private formBuilder = inject(FormBuilder);

  public setAnswer(formGroup: FormGroup<IAnswerForm>) {}

  private initForm(question: QuestionResponseDto) {
    this.formArray = this.formBuilder.array<FormGroup<IAnswerForm>>([]);
    question.answers?.forEach((answer) => {
      this.formArray.push(
        this.formBuilder.group<IAnswerForm>({
          id: this.formBuilder.control<string | undefined>(answer?.id),
          value: this.formBuilder.control<string | null>(null)
        })
      );
    });
  }

  sendAnswer($event: Event) {
    console.warn($event);
  }
}
