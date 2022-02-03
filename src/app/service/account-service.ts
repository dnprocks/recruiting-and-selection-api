import Account from '../model/account';
import {
  IAccountRepository,
  accountRepositoryMock,
} from '../repository/account-repository';

export interface IAccountService {
  create(account: Account): Promise<any>;
}

export class AccountService implements IAccountService {
  constructor(private repository: IAccountRepository = accountRepositoryMock) {}

  public async create(req: Account): Promise<Account> {
    const account = await this.repository.findOne({ email: req.email });
    if (account) {
      throw new Error('Account already exists.');
    }
    return this.repository.save(req);
  }
}
