import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionCardComponent } from './question-card.component';

@NgModule({
  declarations: [QuestionCardComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [QuestionCardComponent]
})
export class QuestionCardModule {}
