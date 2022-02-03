import { Request, Response, Router } from 'express';
import Account from '../model/account';
import { IAccountService, AccountService } from '../service/account-service';

export default class AccountController {
  public router: Router;

  constructor(private accountService: IAccountService = new AccountService()) {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.post('/accounts/create-account', this.createAccount.bind(this));
  }

  private async createAccount(
    req: Request,
    res: Response,
  ): Promise<Account | any> {
    // TODO: Usar para DTO?
    const { body } = req;
    const newAccount = await this.accountService.create({ ...body });
    return res.status(200).json(new Account(newAccount));
  }
}
