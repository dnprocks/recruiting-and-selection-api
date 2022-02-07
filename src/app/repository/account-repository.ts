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
    return this.normalizeReturnId(account);
  }

  async findOneByEmail(email: string): Promise<Account> {
    const account = await AccountSchema.findOne({ email });
    return this.normalizeReturnId(account);
  }

  async findOneById(id: string): Promise<Account> {
    const account = await AccountSchema.findById(id);
    return this.normalizeReturnId(account);
  }

  private normalizeReturnId(obj) {
    const new_obj = Object.assign({}, { id: obj._id, ...obj._doc });
    delete new_obj._id;
    delete new_obj.__v;
    return new_obj;
  }
}
