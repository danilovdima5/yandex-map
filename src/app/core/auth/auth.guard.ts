import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad } from '@angular/router';
import { UserService } from '../shared/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private user: UserService) {}

  canActivate(): Promise<boolean> {
    return this.user.isAuthenticated();
  }

  canActivateChild(): Promise<boolean> {
    return this.user.isAuthenticated();
  }

  canLoad(): Promise<boolean> {
    return this.user.isAuthenticated();
  }
}
