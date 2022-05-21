import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { FormModule } from '../../components/form/form.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: LoginComponent }]),
    ReactiveFormsModule,
    FormModule,
    HttpClientModule,
  ],
})
export class LoginModule {}
