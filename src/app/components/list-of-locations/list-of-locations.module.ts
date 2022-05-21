import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOfLocationsComponent } from './list-of-locations.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ListOfLocationsComponent],
  exports: [ListOfLocationsComponent],
  imports: [CommonModule, RouterModule],
})
export class ListOfLocationsModule {}
