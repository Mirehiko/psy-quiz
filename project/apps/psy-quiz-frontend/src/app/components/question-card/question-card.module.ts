import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuestionCardComponent } from './question-card.component';

@NgModule({
  declarations: [QuestionCardComponent],
  imports: [CommonModule],
  exports: [QuestionCardComponent]
})
export class QuestionCardModule {}
