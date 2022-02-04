import './bootstrap';
import express, { Application, NextFunction, Request, Response } from 'express';
import AccountController from './app/controller/account-controller';
import JobsController from './app/controller/job-controller';

class App {
  public app: Application;
  private pathApi = process.env.PATH_API;
  private accountController: AccountController;
  private jobsController: JobsController;

  constructor() {
    this.app = express();
    this.middleware();
    this.configurationController();
    this.router();
  }

  private middleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private configurationController() {
    this.accountController = new AccountController();
    this.jobsController = new JobsController();
  }

  private router() {
    this.app.use(this.pathApi, this.accountController.router);
    this.app.use(this.pathApi, this.jobsController.router);

    this.app.use(
      async (
        error: Error,
        req: Request,
        response: Response,
        _: NextFunction,
      ) => {
        if (error) {
          response.json({
            statusCode: response.statusCode,
            message: error.message,
          });
        }
      },
    );

    this.app.use('*', (req, res) => {
      res.status(404).send({ message: 'page not found!' });
    });
  }
}

export default new App().app;
