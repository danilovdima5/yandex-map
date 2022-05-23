import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnHoverDirective } from './on-hover.directive';

@NgModule({
  declarations: [OnHoverDirective],
  exports: [OnHoverDirective],
  imports: [CommonModule],
})
export class OnHoverModule {}
