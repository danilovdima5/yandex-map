import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FormModule } from '../../../../components/form/form.module';
import { OneLocationMapModule } from '../../../../components/one-location-map/one-location-map.module';
import { NewLocationComponent } from './new-location.component';

const routes: Routes = [{ path: '', component: NewLocationComponent }];

@NgModule({
  declarations: [NewLocationComponent],
  imports: [
    RouterModule.forChild(routes),
    FormModule,
    OneLocationMapModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class NewLocationModule {}
