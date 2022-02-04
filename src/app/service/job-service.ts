import Account from '../model/account';
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
  viewApplicationsByJob(jobId: string);
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

    job.publish();
    return this.jobRepository.update(job);
  }

  public async applyToJob(id: string, accountId: string) {
    const account = await this.accountRepository.findOneById(accountId);
    if (!account) {
      throw new Error('None Account found with this id');
    }

    const job = await this.jobRepository.findOne({ id });
    if (!job) {
      throw new Error('None job found with this id');
    }

    job.apply(accountId);
    return this.jobRepository.update(job);
  }

  public async viewApplicationsByJob(id: string): Promise<Account[]> {
    const job = await this.jobRepository.findOne({ id });
    console.log(id, job);
    if (!job) {
      throw new Error('None job found with this id');
    }

    return Promise.all(
      job.applications.map(accountId =>
        this.accountRepository.findOneById(accountId),
      ),
    );
  }
}
