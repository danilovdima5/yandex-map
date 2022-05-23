import { Component, OnInit } from '@angular/core';
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
    protected override router: Router,
    protected activatedRoute: ActivatedRoute,
    private toast: ToastService
  ) {
    super(allLocations, screenSize, router);
    if (!this.LOCATION_ID) return;

    this.allLocations
      .getOne(this.LOCATION_ID)
      .subscribe((response) => this.locationForm.setValue(response));
  }

  LOCATION_ID: string | undefined = this.activatedRoute.snapshot.params?.['id'];

  onSubmit() {
    if (!this.LOCATION_ID) return;

    this.locationForm.disable();

    this.allLocations
      .update(this.LOCATION_ID, this.locationForm.value)
      .subscribe(() => {
        this.locationForm.enable();
        this.toast.show(
          'From: Firebase',
          `Location ${this.locationForm.value.title} saved`
        );
        this.router.navigate(['/all-locations']);
      });
  }

  onDelete() {
    if (!this.LOCATION_ID) return;

    this.locationForm.disable();

    this.allLocations.delete(this.LOCATION_ID).subscribe(() => {
      this.locationForm.enable();
      this.toast.show(
        'From: Firebase',
        `Location ${this.locationForm.value.title} deleted`
      );
      this.router.navigate(['/all-locations']);
    });
  }
}
