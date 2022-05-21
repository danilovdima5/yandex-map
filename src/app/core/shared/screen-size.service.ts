import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { DeviceTypes } from '../interfaces/shared.interfaces';

@Injectable({ providedIn: 'root' })
export class ScreenSizeService {
  constructor() {
    this.onResize();
    fromEvent(window, 'resize').subscribe(() => this.onResize());
  }

  private _deviceType!: DeviceTypes;
  private _screenWidth!: number;

  private onResize() {
    this._deviceType = window.screen.width < 576 ? 'small' : 'large';
    this._screenWidth = window.screen.width;
  }

  get deviceType(): DeviceTypes {
    return this._deviceType;
  }

  get screenWidth(): number {
    return this._screenWidth;
  }
}
