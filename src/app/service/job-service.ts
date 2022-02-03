import Job from '../model/Job';
import {
  IJobRepository,
  jobRepositoryMock,
} from '../repository/job-repository';

export interface IJobService {
  create(job: Job): Promise<any>;
}

export class JobService implements IJobService {
  constructor(private repository: IJobRepository = jobRepositoryMock) {}

  public async create(req: Job): Promise<Job> {
    return this.repository.save(req);
  }
}
