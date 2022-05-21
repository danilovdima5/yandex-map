import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Api } from '../../../core/api/api.interface';
import { URLS } from '../../../core/api/urls';
import {
  GetMarksResponse,
  Mark,
  MarkCreateResponse,
  MarkWithID,
} from '../../../core/interfaces/locations.interfaces';
import { UserService } from '../../../core/shared/user.service';
import { MainModule } from '../main.module';

@Injectable({
  providedIn: MainModule,
})
export class AllLocationsService implements Api {
  constructor(private http: HttpClient, private user: UserService) {}

  private _currentLocations$ = new BehaviorSubject<MarkWithID[]>([]);

  get currentLocations$(): Observable<MarkWithID[]> {
    return this._currentLocations$.asObservable();
  }

  create<Mark, MarkCreateResponse>(newLocation: Mark) {
    return this.http.post<MarkCreateResponse>(
      this.getLocationsUrl(),
      newLocation
    );
  }

  getAll() {
    this.http
      .get<GetMarksResponse | null>(this.getLocationsUrl())
      .subscribe((response) => {
        const result: MarkWithID[] = Object.entries(response || {}).map(
          ([locationID, mark]) => {
            return {
              locationID,
              ...mark,
            };
          }
        );

        this._currentLocations$.next(result);
      });
  }

  getOne<Mark>(id: string) {
    return this.http.get<Mark>(this.getLocationsUrl('/' + id));
  }

  update<Mark>(id: string, newLocation: Mark) {
    return this.http
      .put<Mark>(this.getLocationsUrl('/' + id), newLocation)
      .pipe(tap(() => this.getAll()));
  }

  delete(id: string) {
    return this.http
      .delete<null>(this.getLocationsUrl('/' + id))
      .pipe(tap(() => this.getAll()));
  }

  private getLocationsUrl(specLocationId = ''): string {
    return URLS.baseRtDb + this.user.id + specLocationId + '.json';
  }
}
