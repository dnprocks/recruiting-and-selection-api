import { Request, Response, Router } from 'express';
import Job from '../model/Job';
import { IJobService, JobService } from '../service/job-service';

export default class JobsController {
  public router: Router;

  constructor(private jobService: IJobService = new JobService()) {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.post('/jobs/apply/:jobId', this.sampleRoute);
    this.router.get('/jobs/view-applications/:jobId', this.sampleRoute);
    this.router.patch('/jobs/publish-job/:jobId', this.sampleRoute);
    this.router.post('/jobs/create-job', this.createJob.bind(this));
    this.router.get('/jobs/list-all-jobs', this.sampleRoute);
  }

  private async createJob(req: Request, res: Response): Promise<Job | any> {
    try {
      const { name } = req.body;
      const newJob = await this.jobService.create({ name });
      return res.status(201).json(newJob);
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  }

  private async sampleRoute(req: Request, res: Response) {
    res.status(200).json({ jobs: req.body });
  }
}
