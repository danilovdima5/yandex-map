import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMapModule } from '../../../components/main-map/main-map.module';
import { ListOfLocationsModule } from '../../../components/list-of-locations/list-of-locations.module';
import { NavbarModule } from '../../../components/navbar/navbar.module';
import { AllLocationsComponent } from './all-locations.component';

const routes: Routes = [
  { path: '', component: AllLocationsComponent },
  {
    path: 'new',
    loadChildren: () =>
      import('./new-location/new-location.module').then(
        (m) => m.NewLocationModule
      ),
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./change-location/change-location.module').then(
        (m) => m.ChangeLocationModule
      ),
  },
];

@NgModule({
  declarations: [AllLocationsComponent],
  imports: [
    RouterModule.forChild(routes),
    NavbarModule,
    MainMapModule,
    CommonModule,
    ListOfLocationsModule,
  ],
})
export class AllLocationsModule {}
