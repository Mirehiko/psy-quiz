import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  @Input() public menuItems: any[] = [];
  @Input() public user: any | undefined = undefined;
  @Output() public clicked: EventEmitter<any> = new EventEmitter();
}
