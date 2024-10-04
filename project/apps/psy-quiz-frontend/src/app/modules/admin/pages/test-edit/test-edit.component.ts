import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService, TestService } from '@services';
import { switchMap } from 'rxjs';

@Component({
  selector: 'admin-test-edit',
  templateUrl: './test-edit.component.html',
  styleUrls: ['./test-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestEditComponent {
  public formGroup: FormGroup;
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

  public get questions(): FormArray<FormGroup> {
    return this.formGroup.get('questions') as FormArray<FormGroup>;
  }

  constructor() {
    this.formGroup = this.formBuilder.group({
      name: this.formBuilder.control('', Validators.required),
      description: this.formBuilder.control(''),
      questions: this.formBuilder.array<FormGroup>([])
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
            this.formGroup?.get('name')?.setValue(test.name);
            this.formGroup?.get('description')?.setValue(test.description);
            this.cdr.markForCheck();
          });
        return;
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
      name: this.formGroup.get('name')?.value,
      description: this.formGroup.get('description')?.value
    };
    if (this.isEdit) {
      this.update(requestDto);
    } else {
      this.create(requestDto);
    }
  }

  public addQuestion(): void {
    this.questions.push(this.createQuestionForm());
  }

  private createQuestionForm(question?: any): FormGroup {
    const name: string = '';
    const description: string = '';
    const answerType: number = 0;
    const answers: FormArray | undefined = undefined;
    const free_answer: string = '';
    return new FormGroup({
      id: new FormControl(question?.id || undefined),
      questionName: new FormControl(name || ''),
      description: new FormControl(description || ''),
      answerType: new FormControl(answerType || 0),
      freeAnswer: new FormControl(free_answer || '')
    });
  }

  private createQuestionForms(questions: any[]): FormArray {
    return new FormArray(questions.map((question) => this.createQuestionForm(question)));
  }

  public removeQuestion(formIndex: number): void {
    this.questions.removeAt(formIndex);
  }
}
