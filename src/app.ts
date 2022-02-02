import './bootstrap';
import express, { Application } from 'express';
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

    this.app.use('*', (req, res) => {
      res.status(404).send({ message: 'page not found!' });
    });
  }
}

export default new App().app;
