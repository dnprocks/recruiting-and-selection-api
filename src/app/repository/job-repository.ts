import Job from '../model/job';
import JobSchema from '../schemas/job-schema';

export interface IJobRepository {
  save(job: Job): Promise<Job | any>;
  findOneById(id: string): Promise<Job>;
  update(job: Job): Promise<Job>;
  findAll(): Promise<Job[] | any>;
}

export class JobRepository implements IJobRepository {
  async save(jobParams: Job): Promise<Job> {
    const job = await JobSchema.create({
      _id: jobParams.id,
      name: jobParams.name,
      status: jobParams.status,
    });
    return this.toObjectJob(job);
  }

  async findOneById(id: string): Promise<Job> {
    const job = await JobSchema.findById(id);
    return this.toObjectJob(job);
  }

  async update(jobParams: Job): Promise<Job> {
    const job = (await JobSchema.findById(jobParams.id)).set(jobParams);
    await job.save();
    return this.toObjectJob(job);
  }

  async findAll(): Promise<Job[]> {
    const listJobs = await JobSchema.find();
    return listJobs.map(job => this.toObjectJob(job));
  }

  private toObjectJob(job) {
    if (!job) {
      return null;
    }
    const { _id, name, status, applications } = job;
    return new Job({
      id: _id.toString(),
      name,
      status,
      applications,
    });
  }
}
