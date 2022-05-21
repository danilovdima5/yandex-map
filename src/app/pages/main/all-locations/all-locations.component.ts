import { AfterViewInit, Component } from '@angular/core';
import { ScreenSizeService } from '../../../core/shared/screen-size.service';
import { AllLocationsService } from './all-locations.service';

@Component({
  selector: 'app-all-locations',
  templateUrl: './all-locations.component.html',
})
export class AllLocationsComponent implements AfterViewInit {
  constructor(
    public allLocations: AllLocationsService,
    public screenSize: ScreenSizeService
  ) {}

  ngAfterViewInit(): void {
    this.allLocations.getAll();
  }
}
