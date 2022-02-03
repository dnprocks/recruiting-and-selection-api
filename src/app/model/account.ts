import crypto from 'crypto';

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
