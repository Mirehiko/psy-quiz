import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService, TestService } from '@services';
import { switchMap } from 'rxjs';

interface IAnswerForm {
  id: FormControl<string | null>;
  name: FormControl<string | null>;
  description: FormControl<string | null>;
}

interface IQuestionForm {
  id: FormControl<string | null>;
  questionName: FormControl<string | null>;
  description: FormControl<string | null>;
  answerType: FormControl<number | null>;
  freeAnswer: FormControl<string | null>;
  answers: FormArray<FormGroup<IAnswerForm>>;
}

interface ITestForm {
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  questions: FormArray<FormGroup<IQuestionForm>>;
}

@Component({
  selector: 'admin-test-edit',
  templateUrl: './test-edit.component.html',
  styleUrls: ['./test-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestEditComponent {
  public formGroup: FormGroup<ITestForm>;
  public isEdit = false;
  public test: any | undefined = undefined;
  public questionTypes = [
    {
      id: 0,
      name: 'asd'
    }
  ];
  private testService = inject(TestService);
  private questionService = inject(QuestionService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private formBuilder = inject(FormBuilder);
  private questionIds: number[] = [];

  public get questions(): FormArray<FormGroup<IQuestionForm>> {
    return this.formGroup.controls.questions;
  }

  public getAnswers(formGroup: FormGroup<IQuestionForm>): FormArray<FormGroup<IAnswerForm>> {
    return formGroup.controls.answers;
  }

  constructor() {
    this.formGroup = this.formBuilder.group<ITestForm>({
      name: this.formBuilder.control<string>('', Validators.required),
      description: this.formBuilder.control<string>(''),
      questions: this.formBuilder.array<FormGroup<IQuestionForm>>([])
    });

    this.route.params.subscribe((params) => {
      this.isEdit = !!params['id'];
      if (this.isEdit) {
        this.testService
          .getOne(params['id'])
          .pipe(
            takeUntilDestroyed(this.destroyRef),
            switchMap(() => this.testService.entity$)
          )
          .subscribe((test) => {
            this.test = test;
            this.formGroup?.controls.name.setValue(test.name);
            this.formGroup?.controls.description.setValue(test.description);
            this.cdr.markForCheck();
            console.warn('asd');
            this.testService.getQuestions(test.id).subscribe();
          });
        this.testService.testQuestions$.subscribe((questions) => {
          this.formGroup.controls.questions = this.createQuestionForms(questions);
          this.cdr.markForCheck();
        });
      }
    });
  }

  public create(requestDto: any): void {
    this.testService
      .create(requestDto)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.formGroup.reset();
        // this.router.navigate(['..']);
      });
  }

  public update(requestDto: any): void {
    this.testService
      .update(this.test.id, requestDto)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        // this.formGroup.reset();
        // this.router.navigate(['..']);
      });
  }

  public clickHandler(): void {
    const requestDto: { name: string; description?: string } = {
      name: this.formGroup.controls.name.value!,
      description: this.formGroup.controls.description.value!
    };
    if (this.isEdit) {
      this.update(requestDto);
    } else {
      this.create(requestDto);
    }
  }

  public addQuestion(): void {
    this.questions.push(this.createQuestionForm());
    if (this.isEdit) {
      this.testService.addQuestions(this.test.id, {}).subscribe();
    }
  }

  public addAnswer(formGroup: FormGroup<IQuestionForm>): void {
    formGroup.controls.answers.push(this.createAnswerForm());
  }

  public removeAnswer(form: FormArray<FormGroup<IAnswerForm>>, formIndex: number): void {
    form.removeAt(formIndex);
  }

  public removeQuestion(formIndex: number, form: FormGroup<IQuestionForm>): void {
    if (form.controls.id) {
      this.questionService
        .remove(form.controls.id.value!)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.testService.testQuestions$.next(
            this.testService.testQuestions$.value.filter((q) => q.id !== form.controls.id.value)
          );
          this.questions.removeAt(formIndex);
        });
    } else {
      this.questions.removeAt(formIndex);
    }
  }

  private updateQuestionForm(question: any): void {
    this.questions.controls.forEach((control: FormGroup<IQuestionForm>) => {
      if (control.controls.id === question.id) {
        control.controls.questionName.setValue(question.name);
        control.controls.description.setValue(question.description);
        control.controls.freeAnswer.setValue(question.freeAnswer);
        control.controls.answerType.setValue(question.answerType);
      }
    });
  }

  private createQuestionForm(question?: any): FormGroup<IQuestionForm> {
    const name: string = question?.name;
    const description: string = question?.description;
    const answerType: number = question?.answerType;
    const free_answer: string = question?.free_answer;
    return new FormGroup<IQuestionForm>({
      id: this.formBuilder.control<string>(question?.id || undefined),
      questionName: this.formBuilder.control<string>(name || ''),
      description: this.formBuilder.control<string>(description || ''),
      answerType: this.formBuilder.control<number>(answerType || 0),
      freeAnswer: this.formBuilder.control<string>(free_answer || ''),
      answers: this.formBuilder.array<FormGroup<IAnswerForm>>([])
    });
  }

  private createAnswerForm(question?: any): FormGroup<IAnswerForm> {
    const name: string = '';
    const description: string = '';
    return new FormGroup<IAnswerForm>({
      id: this.formBuilder.control<string>(question?.id || undefined),
      name: this.formBuilder.control<string>(name || ''),
      description: this.formBuilder.control<string>(description || '')
    });
  }

  private createQuestionForms(questions: any[]): FormArray<FormGroup<IQuestionForm>> {
    return new FormArray<FormGroup<IQuestionForm>>(questions.map((question) => this.createQuestionForm(question)));
  }

  public questionChanged(questionForm: FormGroup<IQuestionForm>): void {
    this.questionService
      .update(questionForm.controls.id.value!, {
        name: questionForm.controls.questionName.value!,
        description: questionForm.controls.description.value!,
        answerType: questionForm.controls.answerType.value!,
        freeAnswer: questionForm.controls.freeAnswer.value!
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        // this.formGroup.reset();
        // this.router.navigate(['..']);
      });
  }
}
