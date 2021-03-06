import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './404.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: NotFoundComponent }]),
  ],
})
export class NotFoundModule {}
