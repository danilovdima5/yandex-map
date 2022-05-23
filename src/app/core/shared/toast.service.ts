import { Injectable } from '@angular/core';

declare const bootstrap: any;

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toast: any;
  private toastDiv!: HTMLElement;
  private toastHeader!: HTMLElement;
  private toastText!: HTMLElement;

  constructor() {
    this.toast = new bootstrap.Toast('#liveToast');
    this.toastDiv = document.querySelector('#liveToast') as HTMLElement;
    this.toastHeader = this.toastDiv.querySelector('.me-auto') as HTMLElement;
    this.toastText = this.toastDiv.querySelector('.toast-body') as HTMLElement;
  }

  public show(header: string, message: string) {
    this.toastHeader.innerHTML = header;
    this.toastText.innerHTML = message;

    this.toast.show();
  }
}
