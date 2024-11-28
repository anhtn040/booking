export interface IRegisterForm {
  email: string;
  password: string;
  passwordConfirm: string;
  fullname: string;
  gender: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IGetCode {
  email: string;
}

export interface IForgotPassword {
  newPassword: string,
  confirmPassword: string,
  token: string
}