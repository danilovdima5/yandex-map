import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../core/shared/user.service';
import { InputItem } from '../../core/interfaces/shared.interfaces';
import { ToastService } from '../../core/shared/toast.service';
import { finalize } from 'rxjs';
import { URLS } from '../../core/api/urls';
import {
  HttpLoginError,
  HttpErrorTranslation,
} from '../../core/api/http-errors-translations';
import {
  animate,
  group,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import { slideInLeft, slideInRight, slideInUp } from 'ng-animate';

const signInputs: InputItem[] = [
  {
    key: 'email',
    type: 'email',
    span: 'E-mail',
  },
  {
    key: 'password',
    type: 'password',
    span: 'Password',
  },
];

const animationDuration = 500;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('appearFromLeft', [
      transition(':enter', [
        group([
          style({ opacity: 0 }),
          animate(
            500,
            style({
              opacity: 1,
            })
          ),
          useAnimation(slideInLeft, {
            params: {
              timing: 0.5,
            },
          }),
        ]),
      ]),
    ]),
    trigger('appearFromRight', [
      transition(':enter', [
        group([
          style({ opacity: 0 }),
          animate(
            500,
            style({
              opacity: 1,
            })
          ),
          useAnimation(slideInRight, {
            params: {
              timing: 0.5,
            },
          }),
        ]),
      ]),
    ]),
    trigger('appearFromTop', [
      transition(':enter', [
        group([
          style({ opacity: 0 }),
          animate(
            500,
            style({
              opacity: 1,
            })
          ),
          useAnimation(slideInUp, {
            params: {
              timing: 0.5,
            },
          }),
        ]),
      ]),
    ]),
  ],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private userService: UserService,
    private toastService: ToastService
  ) {}

  signInForm = new FormControl(null);
  signUpForm = new FormControl(null);

  signInputs = signInputs;
  URLS = URLS;

  onSubmit(url: string, form: FormControl): void {
    form.disable();

    this.userService
      .create(url, {
        ...form.value,
        returnSecureToken: true,
      })
      .pipe(
        finalize(() => {
          form.enable();
          form.reset();
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
          this.toastService.showToast(
            'From Firebase:',
            'Logged in successfully'
          );
        },
        error: (err: HttpErrorResponse) => {
          const errMsg = err.error.error.message as HttpLoginError;
          this.toastService.showToast(
            'From Firebase:',
            HttpErrorTranslation[errMsg]
          );
        },
      });
  }
}
