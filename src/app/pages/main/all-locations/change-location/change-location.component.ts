import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationPage } from '../../../../core/abstract/location-page.abstract';
import { ScreenSizeService } from '../../../../core/shared/screen-size.service';
import { ToastService } from '../../../../core/shared/toast.service';
import { AllLocationsService } from '../all-locations.service';

@Component({
  selector: 'app-change-location',
  templateUrl: './change-location.component.html',
})
export class ChangeLocationComponent extends LocationPage {
  constructor(
    protected override allLocations: AllLocationsService,
    public override screenSize: ScreenSizeService,
    protected activatedRoute: ActivatedRoute,
    protected override router: Router,
    private toast: ToastService
  ) {
    super(allLocations, screenSize, router);

    this.allLocations
      .getOne(this.locationID)
      .subscribe((response) => this.locationForm.setValue(response));
  }

  private locationID = this.activatedRoute.snapshot.params['id'] as string;

  onSubmit() {
    this.allLocations
      .update(this.locationID, this.locationForm.value)
      .subscribe(() => {
        this.toast.showToast(
          'From: Firebase',
          `Location ${this.locationForm.value.title} saved`
        );
        this.router.navigate(['/all-locations']);
      });
  }

  onDelete() {
    this.allLocations.delete(this.locationID).subscribe(() => {
      this.toast.showToast(
        'From: Firebase',
        `Location ${this.locationForm.value.title} deleted`
      );
      this.router.navigate(['/all-locations']);
    });
  }
}
