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
    return this.normalizeReturnId(job);
  }

  async findOneById(id: string): Promise<Job> {
    const job = await JobSchema.findById(id);
    return this.normalizeReturnId(job);
  }

  async update(jobParams: Job): Promise<Job> {
    const job = (await JobSchema.findById(jobParams.id)).set(jobParams);
    await job.save();
    return this.normalizeReturnId(job);
  }

  async findAll(): Promise<Job[]> {
    const listJobs = await JobSchema.find();
    return listJobs.map(job => this.normalizeReturnId(job));
  }

  private normalizeReturnId(obj) {
    if (!obj) return null;
    const new_obj = Object.assign({}, { id: obj._id, ...obj._doc });
    delete new_obj._id;
    delete new_obj.__v;
    return new_obj;
  }
}
