import { Directive } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AllLocationsService } from '../../pages/main/all-locations/all-locations.service';
import { InputItem } from '../interfaces/shared.interfaces';
import { Coords } from '../interfaces/user.interfaces';
import { ScreenSizeService } from '../shared/screen-size.service';

const newLocationInputs: InputItem[] = [
  {
    key: 'title',
    type: 'text',
    span: 'Title',
  },
  {
    key: 'description',
    type: 'textarea',
    span: 'Description',
  },
  {
    key: 'latitude',
    type: 'number',
    span: 'Latitude',
  },
  {
    key: 'longitude',
    type: 'number',
    span: 'Longitude',
  },
];

@Directive()
export abstract class LocationPage {
  constructor(
    protected allLocations: AllLocationsService,
    protected screenSize: ScreenSizeService,
    protected router: Router
  ) {}

  newLocationInputs = newLocationInputs;
  locationForm = new FormControl();

  abstract onSubmit(): void;

  onMapClick(e: Coords): void {
    this.locationForm.patchValue(e);
  }
}
