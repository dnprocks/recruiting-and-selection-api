import Account from '../model/account';
import {
  AccountRepository,
  IAccountRepository,
} from '../repository/account-repository';

export interface IAccountService {
  create(account: Account): Promise<Account>;
}

export class AccountService implements IAccountService {
  constructor(
    private repository: IAccountRepository = new AccountRepository(),
  ) {}

  public async create(accountRequest: Account): Promise<Account> {
    const account = await this.repository.findOneByEmail(accountRequest.email);
    if (account) {
      throw new Error('Account already exists.');
    }

    try {
      return this.repository.save(
        new Account({
          name: accountRequest.name,
          email: accountRequest.email,
          password: accountRequest.password,
        }),
      );
    } catch (error) {
      throw new Error('Fail to create account');
    }
  }
}
