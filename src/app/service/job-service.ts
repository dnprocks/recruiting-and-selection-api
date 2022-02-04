import Job, { JobParams } from '../model/job';
import {
  accountRepositoryMock,
  IAccountRepository,
} from '../repository/account-repository';
import {
  IJobRepository,
  jobRepositoryMock,
} from '../repository/job-repository';

export interface IJobService {
  create(job: JobParams): Promise<any>;
  publishJob(id: string);
  findAll();
  applyToJob(jobId: string, accountId: string);
}

export class JobService implements IJobService {
  constructor(
    private jobRepository: IJobRepository = jobRepositoryMock,
    private accountRepository: IAccountRepository = accountRepositoryMock,
  ) {}

  public async create(req: JobParams): Promise<Job> {
    return this.jobRepository.save(new Job({ ...req }));
  }

  public async findAll(): Promise<Job[]> {
    return this.jobRepository.findAll();
  }

  public async publishJob(id: string) {
    const job = await this.jobRepository.findOne({ id });
    if (!job) {
      throw new Error('None job found with this id');
    }

    try {
      job.publish();
    } catch (error) {
      throw error;
    }

    return this.jobRepository.update(job);
  }

  public async applyToJob(id: string, accountId: string) {
    const job = await this.jobRepository.findOne({ id });
    if (!job) {
      throw new Error('None job found with this id');
    }

    const account = await this.accountRepository.findOneById(accountId);
    if (!account) {
      throw new Error('None Account found with this id');
    }

    try {
      job.apply(accountId);
    } catch (error) {
      throw error;
    }

    return this.jobRepository.update(job);
  }
}
