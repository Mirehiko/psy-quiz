import { Injectable, inject } from '@angular/core';
import { QuestionResponseDto, ScaleResponseDto, TestResponseDto } from '@shared/dto';
import { IResponse } from '@shared/interfaces';
import { Observable, tap } from 'rxjs';
import { TestRestService } from '../rest';
import { QuestionStore, RunStore, ScaleStore, TestStore } from '../store';
import { BaseService } from './base.service';

@Injectable()
export class TestService extends BaseService<TestResponseDto> {
  protected api = inject(TestRestService);
  protected store = inject(TestStore);
  protected runStore = inject(RunStore);
  protected questionStore = inject(QuestionStore);
  protected scaleStore = inject(ScaleStore);

  public getActiveRun(testId: string) {
    return this.api.getActiveRun(testId).pipe(
      tap((activeRun) => {
        if (activeRun.data) {
          this.runStore.add([activeRun.data]);
          this.runStore.select(activeRun.data);
        }
      })
    );
  }

  public getScales(id: string): Observable<IResponse<ScaleResponseDto[]>> {
    return this.api.getScales(id).pipe(tap((scales) => this.scaleStore.add(scales.data)));
  }

  public getQuestions(id: string): Observable<IResponse<QuestionResponseDto[]>> {
    return this.api.getQuestions(id).pipe(tap((questions) => this.questionStore.add(questions.data)));
  }

  public addQuestions(id: string, requestDto: any): Observable<IResponse<QuestionResponseDto>> {
    return this.api.addQuestion(id, requestDto).pipe(tap((question) => this.questionStore.add([question.data])));
  }
}
