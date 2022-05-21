import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { AuthInterceptor } from '../../core/auth/auth.interceptor';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'all-locations',
        pathMatch: 'full',
      },
      {
        path: 'all-locations',
        loadChildren: () =>
          import('./all-locations/all-locations.module').then(
            (m) => m.AllLocationsModule
          ),
      },
      {
        path: 'new-location',
        loadChildren: () =>
          import('./all-locations/new-location/new-location.module').then(
            (m) => m.NewLocationModule
          ),
      },
      {
        path: 'my-account',
        loadChildren: () =>
          import('./my-account/my-account.module').then(
            (m) => m.MyAccountModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [MainComponent],
  imports: [
    RouterModule.forChild(routes),
    NavbarModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class MainModule {}
