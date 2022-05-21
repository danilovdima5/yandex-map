export interface InputItem {
  key: string;
  type: 'text' | 'password' | 'email' | 'number' | 'textarea';
  span: string;
}

export type BootstrapSizes = '-sm' | '-md' | '-lg' | '-xl' | '-xxl';

export type DeviceTypes = 'large' | 'small';
