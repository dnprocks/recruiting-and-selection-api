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
    // TODO: Usar para DTO
    try {
      const { body } = req;
      const newAccount = await this.accountService.create({ ...body });
      return res.status(201).json(newAccount);
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  }
}
