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

  constructor(props: Omit<Account, 'id'>, id?: string) {
    if (!id) {
      this.id = crypto.randomUUID();
    }
    Object.assign(this, props);
  }
}
