import { Observable } from 'rxjs';

export interface Api {
  getOne?<T>(url: string): Observable<T>;
  getAll?(): void;
  create<T, Y>(url: string, body: Y): Observable<T>;
  delete?(url: string): Observable<null>;
  update?<T>(url: string, body: T): Observable<T>;
}
