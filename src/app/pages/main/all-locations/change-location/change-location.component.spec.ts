import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ToastService } from '../../../../core/shared/toast.service';
import { AllLocationsService } from '../all-locations.service';
import { ChangeLocationComponent } from './change-location.component';

describe('Change location page', () => {
  let component: ChangeLocationComponent;
  let allLocations: jasmine.SpyObj<AllLocationsService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: jasmine.SpyObj<ActivatedRoute>;
  let toast: jasmine.SpyObj<ToastService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChangeLocationComponent,
        {
          provide: Router,
          useFactory: () => ({
            navigate: jasmine.createSpy(),
          }),
        },
        {
          provide: AllLocationsService,
          useFactory: () => ({
            update: jasmine.createSpy(),
            getOne: jasmine.createSpy(),
            delete: jasmine.createSpy(),
          }),
        },
        {
          provide: ActivatedRoute,
          useFactory: () => ({
            snapshot: jasmine.createSpy(),
          }),
        },
        {
          provide: ToastService,
          useFactory: () => ({
            show: jasmine.createSpy(),
          }),
        },
      ],
    });

    component = TestBed.inject(ChangeLocationComponent);

    allLocations = TestBed.inject(
      AllLocationsService
    ) as jasmine.SpyObj<AllLocationsService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(
      ActivatedRoute
    ) as jasmine.SpyObj<ActivatedRoute>;
    toast = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
  });

  it('should create change location component instance', () => {
    expect(component).toBeTruthy();
  });

  describe('Forms with no locationId should not work', () => {
    it('onSubmit does not work withoud locationId', () => {
      component.LOCATION_ID = '';

      component.onSubmit();

      expect(allLocations.update).not.toHaveBeenCalled();
    });
    it('onDelete does not work withoud locationId', () => {
      component.LOCATION_ID = '';

      component.onDelete();

      expect(allLocations.delete).not.toHaveBeenCalled();
    });
  });

  describe('Forms with locationId should call methods', () => {
    it('onSubmit should call update and redirect the user', () => {
      component.LOCATION_ID = 'locationId';
      component.locationForm.patchValue({
        title: 'locationTitle',
      });
      allLocations.update.and.returnValue(of(true));
      component.onSubmit();

      expect(allLocations.update).toHaveBeenCalledOnceWith(
        component.LOCATION_ID,
        component.locationForm.value
      );
      expect(toast.show).toHaveBeenCalledOnceWith(
        'From: Firebase',
        `Location ${component.locationForm.value.title} saved`
      );
      expect(router.navigate).toHaveBeenCalledOnceWith(['/all-locations']);
    });

    it('onDelete should call delete and redirect the user', () => {
      component.LOCATION_ID = 'locationId';
      component.locationForm.patchValue({
        title: 'locationTitle',
      });
      allLocations.delete.and.returnValue(of(null));

      component.onDelete();

      expect(allLocations.delete).toHaveBeenCalledOnceWith(
        component.LOCATION_ID
      );
      expect(toast.show).toHaveBeenCalledOnceWith(
        'From: Firebase',
        `Location ${component.locationForm.value.title} deleted`
      );
      expect(router.navigate).toHaveBeenCalledOnceWith(['/all-locations']);
    });
  });
});
