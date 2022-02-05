import Account from '../model/account';
import AccountSchema from '../schemas/account-schema';

export interface IAccountRepository {
  save(account: Account): Promise<Account | any>;
  findOneByEmail(email: string): Promise<Account>;
  findOneById(id: string): Promise<Account>;
}

export class AccountRepository implements IAccountRepository {
  async save(account: Account): Promise<Account> {
    try {
      const data = await AccountSchema.create({
        _id: account.id,
        name: account.name,
        email: account.email,
        password: account.password,
      });
      return data.toJSON();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findOneByEmail(email: string): Promise<Account> {
    return AccountSchema.findOne({ email });
  }

  async findOneById(id: string): Promise<Account> {
    return AccountSchema.findById(id);
  }
}
