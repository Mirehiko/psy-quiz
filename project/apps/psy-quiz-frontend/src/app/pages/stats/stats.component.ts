import { Component, OnInit, inject } from '@angular/core';
import { RunService } from '@services';

@Component({
  selector: 'app-stats',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss']
})
export class StatsComponent implements OnInit {
  private runService = inject(RunService);
  constructor() {
    this.runService;
  }
}
