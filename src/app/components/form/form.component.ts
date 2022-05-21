import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { InputItem } from '../../core/interfaces/shared.interfaces';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormComponent),
      multi: true,
    },
  ],
})
export class FormComponent implements OnInit, ControlValueAccessor {
  constructor(private cdr: ChangeDetectorRef) {}

  @Input() inputs: InputItem[] = [];
  @Input() header = '';

  @Output() onSubmit = new EventEmitter<void>();

  onChange: any = () => {};
  onTouched: any = () => {};

  form!: FormGroup;
  isError = false;

  submit() {
    if (this.form.invalid) {
      this.isError = true;
      return;
    }

    this.onSubmit.emit();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    if (obj) {
      this.form.patchValue(obj);
    } else {
      this.form.reset();
    }

    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.form = new FormGroup({});
    this.inputs.forEach((input: InputItem) => {
      this.form.addControl(
        input.key,
        new FormControl(null, this.setValidators(input))
      );
    });
    this.form.valueChanges.subscribe((data) => {
      this.onChange(data);
    });
    this.cdr.detectChanges();
  }

  validate(): ValidationErrors | null {
    return this.form.valid ? null : { error: 'error' };
  }

  setValidators(input: InputItem) {
    let validators = [Validators.required];

    if (input.type === 'email') {
      validators.push(Validators.email);
    }
    if (input.type === 'password') {
      validators.push(Validators.minLength(6));
    }

    return validators;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
    this.cdr.detectChanges();
  }

  idComposer(inputSpan: string): string {
    return (this.header + inputSpan).replace(/\s/g, '');
  }
}
