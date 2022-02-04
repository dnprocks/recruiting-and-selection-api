import { NextFunction, Request, Response, Router } from 'express';
import { AccountDTO } from '../model/account';
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
    next: NextFunction,
  ): Promise<Response<AccountDTO>> {
    try {
      const { body } = req;
      const newAccount = await this.accountService.create({
        ...body,
      });

      const data = new AccountDTO({
        ...newAccount,
      });

      return res.status(201).json({ data });
    } catch (error) {
      res.status(400);
      next(error);
    }
  }
}
