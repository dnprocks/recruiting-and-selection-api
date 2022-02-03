import { NextFunction, Request, Response, Router } from 'express';
import Job from '../model/job';
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
    this.router.patch('/jobs/publish-job/:jobId', this.publishJob.bind(this));
    this.router.post('/jobs/create-job', this.createJob.bind(this));
    this.router.get('/jobs/list-all-jobs', this.listAllJobs.bind(this));
  }

  private async createJob(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Job | any> {
    try {
      const { name } = req.body;
      const newJob = await this.jobService.create({ name });
      return res.status(201).json({ data: newJob });
    } catch (error) {
      res.status(400);
      next(error);
    }
  }

  private async publishJob(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Job | any> {
    try {
      const { jobId } = req.params;
      const updateJob = await this.jobService.publishJob(jobId);
      res.status(200).json({ data: updateJob });
    } catch (error) {
      res.status(400);
      next(error);
    }
  }

  private async listAllJobs(req: Request, res: Response) {
    const listJobs = await this.jobService.findAll();
    res.status(200).json({ data: listJobs });
  }

  private async sampleRoute(req: Request, res: Response) {
    res.status(200).json({ jobs: req.body });
  }
}
