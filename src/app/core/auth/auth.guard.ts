import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad } from '@angular/router';
import { UserService } from '../shared/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private userService: UserService) {}

  canActivate(): Promise<boolean> {
    return this.userService.isAuthenticated();
  }

  canActivateChild(): Promise<boolean> {
    return this.userService.isAuthenticated();
  }

  canLoad(): Promise<boolean> {
    return this.userService.isAuthenticated();
  }
}
