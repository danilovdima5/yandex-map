import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocationPage } from '../../../../core/abstract/location-page.abstract';
import { Mark } from '../../../../core/interfaces/locations.interfaces';
import { Coords } from '../../../../core/interfaces/user.interfaces';
import { ScreenSizeService } from '../../../../core/shared/screen-size.service';
import { ToastService } from '../../../../core/shared/toast.service';
import { UserService } from '../../../../core/shared/user.service';
import { AllLocationsService } from '../all-locations.service';

@Component({
  selector: 'app-new-location',
  templateUrl: './new-location.component.html',
})
export class NewLocationComponent extends LocationPage {
  constructor(
    protected override allLocations: AllLocationsService,
    public override screenSize: ScreenSizeService,
    protected override router: Router,
    private toast: ToastService
  ) {
    super(allLocations, screenSize, router);
  }

  onSubmit() {
    this.locationForm.disable();

    this.allLocations.create(this.locationForm.value as Mark).subscribe(() => {
      this.locationForm.enable();
      this.toast.showToast(
        'From: Firebase',
        `Location ${this.locationForm.value.title} saved`
      );
      this.router.navigate(['/all-locations']);
    });
  }
}
