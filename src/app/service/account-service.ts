import Account from '../model/account';
import {
  IAccountRepository,
  repositoryMock,
} from '../repository/account-repository';

export interface IAccountService {
  create(account: Account): Promise<any>;
}

export class AccountService implements IAccountService {
  constructor(private repository: IAccountRepository = repositoryMock) {}

  public async create(req: Account): Promise<Account> {
    const account = await this.repository.findOne({ email: req.email });
    if (account) {
      throw new Error('Account already exists.');
    }
    return new Account(this.repository.save(req));
  }
}
