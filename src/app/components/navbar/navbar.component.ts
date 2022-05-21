import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DeviceTypes } from '../../core/interfaces/shared.interfaces';
import { UserService } from '../../core/shared/user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  constructor(public userService: UserService) {}

  @Input() deviceType: DeviceTypes = 'small';
}
