export default class User {
  email: string;
  password: string;
  passwordConfirmation: string;

  constructor(email: string, password: string, passwordConfirmation: string) {
    this.email = email;
    this.password = password;
    this.passwordConfirmation = passwordConfirmation;
  }
}
