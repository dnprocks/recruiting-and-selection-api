import express, { Application } from 'express';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.router();
  }

  private middleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private router() {
    this.app.use('/', (req, res) => {
      res.send('index');
    });

    this.app.use('*', (req, res) => {
      res.status(404).send({ message: 'page not found!' });
    });
  }
}

export default new App().app;
