import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpErrorTranslation } from '../../core/api/http-errors-translations';
import { ToastService } from '../../core/shared/toast.service';
import { UserService } from '../../core/shared/user.service';
import { LoginComponent } from './login.component';

describe('Login page', () => {
  let component: LoginComponent;
  let router: jasmine.SpyObj<Router>;
  let user: jasmine.SpyObj<UserService>;
  let toast: jasmine.SpyObj<ToastService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginComponent,
        {
          provide: Router,
          useFactory: () => ({
            navigate: jasmine.createSpy(),
          }),
        },
        {
          provide: UserService,
          useFactory: () => ({
            create: jasmine.createSpy(),
          }),
        },
        {
          provide: ToastService,
          useFactory: () => ({
            show: jasmine.createSpy(),
          }),
        },
      ],
    });

    component = TestBed.inject(LoginComponent);

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    user = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    toast = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
  });

  it('should create loginPage component instance', () => {
    expect(component).toBeTruthy();
  });

  describe('Submit', () => {
    it('should show toast with error and not redirect user if their data is incorrect', () => {
      const url = 'randomUrl';
      user.create.and.returnValue(
        throwError(() => {
          return {
            error: {
              error: {
                message: 'EMAIL_NOT_FOUND',
              },
            },
          };
        })
      );

      component.onSubmit(url, component.signInForm);

      expect(toast.show).toHaveBeenCalledOnceWith(
        'From Firebase:',
        HttpErrorTranslation['EMAIL_NOT_FOUND']
      );

      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should show toast and redirect user to the main page', () => {
      const url = 'randomUrl';
      user.create.and.returnValue(of(true));

      component.onSubmit(url, component.signInForm);

      expect(toast.show).toHaveBeenCalledOnceWith(
        'From Firebase:',
        'Logged in successfully'
      );

      expect(router.navigate).toHaveBeenCalledOnceWith(['/']);
    });
  });
});
