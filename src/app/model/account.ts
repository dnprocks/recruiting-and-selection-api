import crypto from 'crypto';

export class AccountDTO {
  id?: string;
  name: string;
  email: string;
  constructor({ id, name, email }: any) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}
export default class Account {
  id?: string;
  name: string;
  email: string;
  password: string;

  constructor({ id, name, email, password }: Account) {
    this.id = id || crypto.randomUUID();
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
