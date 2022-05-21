import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OneLocationMapComponent } from './one-location-map.component';

@NgModule({
  declarations: [OneLocationMapComponent],
  exports: [OneLocationMapComponent],
  imports: [CommonModule],
})
export class OneLocationMapModule {}
