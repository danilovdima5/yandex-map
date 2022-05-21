import { Component } from '@angular/core';
import { ScreenSizeService } from '../../core/shared/screen-size.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent {
  constructor(public deviceSize: ScreenSizeService) {}
}
