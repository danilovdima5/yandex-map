import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyAccountComponent } from './my-account.component';

const routes: Routes = [{ path: '', component: MyAccountComponent }];

@NgModule({
  declarations: [MyAccountComponent],
  imports: [RouterModule.forChild(routes)],
})
export class MyAccountModule {}
