import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Api } from '../api/api.interface';
import {
  AuthInfo,
  FbAuthResponse,
  RefreshRequest,
  RefreshResponse,
  RefreshResponseCapitalized,
} from '../interfaces/user.interfaces';
import { URLS } from './../api/urls';

@Injectable({ providedIn: 'root' })
export class UserService implements Api {
  constructor(private http: HttpClient, private router: Router) {}

  get id(): string | null {
    return localStorage.getItem('user-id');
  }

  create<FbAuthResponse, AuthInfo>(
    url: string,
    body: AuthInfo
  ): Observable<FbAuthResponse> {
    return this.http
      .post<FbAuthResponse>(url, body)
      .pipe(tap((response) => this.setTokens(response as any)));
  }

  private async getToken(): Promise<string> {
    const expDate = new Date(localStorage.getItem('fb-token-exp') as string);

    if (expDate > new Date()) {
      return Promise.resolve(localStorage.getItem('fb-token') as string);
    } else {
      const refreshToken = localStorage.getItem('fb-refresh-token');
      if (refreshToken) {
        return this.refreshToken(refreshToken);
      } else {
        this.logout();
        return Promise.resolve('');
      }
    }
  }

  private refreshToken(refreshToken: string): Promise<string> {
    return new Promise<string>(async (resolve) => {
      this.http
        .post<RefreshResponse>(URLS.refreshUrl, {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        })
        .subscribe((response) => {
          let result: RefreshResponseCapitalized = {
            expiresIn: response.expires_in,
            tokenType: response.token_type,
            refreshToken: response.refresh_token,
            idToken: response.id_token,
            userId: response.user_id,
            projectId: response.project_id,
          };

          this.setTokens(result);
          resolve(response.id_token);
        });
    });
  }

  logout() {
    this.router.navigate(['/login']);
    this.setTokens(null);
  }

  async isAuthenticated(): Promise<boolean> {
    let result = true;

    await this.getToken().then((response) => (result = !!response));

    return Promise.resolve(result);
  }

  private setTokens(
    response: FbAuthResponse | RefreshResponseCapitalized | null
  ) {
    if (response) {
      const expDate = new Date(
        new Date().getTime() + +response.expiresIn * 1000
      );
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
      localStorage.setItem('fb-refresh-token', response.refreshToken);
      if ((response as any).localId) {
        localStorage.setItem('user-id', (response as any).localId);
      }
    } else {
      localStorage.clear();
    }
  }
}
