import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {}
