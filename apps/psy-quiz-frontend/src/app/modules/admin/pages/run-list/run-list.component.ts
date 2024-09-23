import { Component, inject } from '@angular/core';
import { RunService, SocketIoService } from '@services';

@Component({
  selector: 'admin-run-list',
  templateUrl: './run-list.component.html',
  styleUrls: ['./run-list.component.scss']
})
export class RunListComponent {
  private runService = inject(RunService);
  public runs: any[] = [];
  private socketIoService = inject(SocketIoService);

  constructor() {
    this.runService.getAll().subscribe((runs) => {
      this.runs = runs.data;
    });
    this.socketIoService.getOnlineStatuses().subscribe((status) => {});
  }
}
