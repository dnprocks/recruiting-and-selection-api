import { NextFunction, Request, Response, Router } from 'express';
import { body, param } from 'express-validator';
import { JobDTO } from '../model/job';
import { IJobService, JobService } from '../service/job-service';
import { validate } from './validator/validator';

export default class JobsController {
  public router: Router;

  constructor(private jobService: IJobService = new JobService()) {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.post(
      '/jobs/apply/:jobId',
      validate([body('accountId').notEmpty({ ignore_whitespace: true })]),
      this.applyToJob.bind(this),
    );
    this.router.get(
      '/jobs/view-applications/:jobId',
      this.viewApplications.bind(this),
    );
    this.router.post(
      '/jobs/create-job',
      validate([body('name').notEmpty({ ignore_whitespace: true })]),
      this.createJob.bind(this),
    );
    this.router.patch('/jobs/publish-job/:jobId', this.publishJob.bind(this));
    this.router.get('/jobs/list-all-jobs', this.listAllJobs.bind(this));
  }

  private async createJob(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<JobDTO>> {
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
  ): Promise<Response<JobDTO>> {
    try {
      const { jobId } = req.params;
      const publishedJob = await this.jobService.publishJob(jobId);
      return res.status(200).json({ data: publishedJob });
    } catch (error) {
      res.status(400);
      next(error);
    }
  }

  private async listAllJobs(
    req: Request,
    res: Response,
  ): Promise<Response<JobDTO[]>> {
    const listJobs = await this.jobService.findAll();
    return res.status(200).json({ data: listJobs });
  }

  private async applyToJob(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<JobDTO>> {
    try {
      const { jobId } = req.params;
      const { accountId } = req.body;
      const jobApplied = await this.jobService.applyToJob(jobId, accountId);
      return res.status(200).json({ data: jobApplied });
    } catch (error) {
      res.status(400);
      next(error);
    }
  }

  private async viewApplications(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<JobDTO[]>> {
    try {
      const { jobId } = req.params;
      const listJobs = await this.jobService.viewApplicationsByJob(jobId);
      return res.status(200).json({ data: listJobs });
    } catch (error) {
      res.status(400);
      next(error);
    }
  }
}
