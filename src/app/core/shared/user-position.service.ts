import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Coords } from '../interfaces/user.interfaces';

@Injectable({ providedIn: 'root' })
export class UserPositionService {
  constructor() {
    navigator.geolocation.watchPosition((position) => {
      const currentPosition = this._position$.value;

      if (
        currentPosition?.latitude !== position.coords.latitude &&
        currentPosition?.longitude !== position.coords.longitude
      ) {
        this._position$.next({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      }
    });
  }

  private _position$ = new BehaviorSubject<Coords | null>(null);

  get location$(): Observable<Coords | null> {
    return this._position$.asObservable();
  }
}
