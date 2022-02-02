import { Request, Response, Router } from 'express';

export default class JobsController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.post('/jobs/apply/:jobId', this.sampleRoute);
    this.router.get('/jobs/view-applications/:jobId', this.sampleRoute);
    this.router.patch('/jobs/publish-job/:jobId', this.sampleRoute);
    this.router.post('/jobs/create-job', this.sampleRoute);
    this.router.get('/jobs/list-all-jobs', this.sampleRoute);
  }

  private async sampleRoute(req: Request, res: Response) {
    res.status(200).json({ jobs: req.body });
  }
}
