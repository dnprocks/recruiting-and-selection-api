import { Request, Response, Router } from 'express';

export default class AccountController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.post('/accounts/create-account', this.createAccount);
  }

  private async createAccount(req: Request, res: Response) {
    res.status(200).json(req.body);
  }
}
