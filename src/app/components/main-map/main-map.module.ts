import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMapComponent } from './main-map.component';

@NgModule({
  declarations: [MainMapComponent],
  exports: [MainMapComponent],
  imports: [CommonModule],
})
export class MainMapModule {}
