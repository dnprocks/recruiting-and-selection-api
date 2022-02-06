import Account from '../model/account';
import AccountSchema from '../schemas/account-schema';

export interface IAccountRepository {
  save(account: Account): Promise<Account | any>;
  findOneByEmail(email: string): Promise<Account>;
  findOneById(id: string): Promise<Account>;
}

export class AccountRepository implements IAccountRepository {
  async save(accountParams: Account): Promise<Account> {
    const account = await AccountSchema.create({
      _id: accountParams.id,
      name: accountParams.name,
      email: accountParams.email,
      password: accountParams.password,
    });
    return this.toObjectAccount(account);
  }

  async findOneByEmail(email: string): Promise<Account> {
    const account = await AccountSchema.findOne({ email });
    return this.toObjectAccount(account);
  }

  async findOneById(id: string): Promise<Account> {
    const account = await AccountSchema.findById(id);
    return this.toObjectAccount(account);
  }

  private toObjectAccount(account) {
    if (!account) {
      return null;
    }
    const { _id, name, email, password } = account;
    return new Account({
      id: _id.toString(),
      name,
      email,
      password,
    });
  }
}
