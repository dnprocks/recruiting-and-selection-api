import Job, { JobParams } from '../model/job';
import {
  IJobRepository,
  jobRepositoryMock,
} from '../repository/job-repository';

export interface IJobService {
  create(job: JobParams): Promise<any>;
  publishJob(id: string);
  findAll();
}

export class JobService implements IJobService {
  constructor(private repository: IJobRepository = jobRepositoryMock) {}

  public async create(req: JobParams): Promise<Job> {
    return this.repository.save(new Job({ ...req }));
  }

  public async publishJob(id: string) {
    const job = await this.repository.findOne({ id });
    if (!job) {
      throw new Error('None job found with this id');
    }

    try {
      job.publish();
    } catch (error) {
      throw error;
    }

    return this.repository.update(job);
  }

  public async findAll(): Promise<Job[]> {
    return this.repository.findAll();
  }
}
