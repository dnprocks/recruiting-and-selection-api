import Account from '../model/account';
import Job, { JobParams } from '../model/job';
import {
  AccountRepository,
  IAccountRepository,
} from '../repository/account-repository';
import { IJobRepository, JobRepository } from '../repository/job-repository';

export interface IJobService {
  create(job: JobParams): Promise<Job>;
  publishJob(id: string): Promise<Job>;
  findAll(): Promise<Job[] | any>;
  applyToJob(jobId: string, accountId: string): Promise<Job>;
  viewApplicationsByJob(jobId: string): Promise<Account[]>;
}

export class JobService implements IJobService {
  constructor(
    private jobRepository: IJobRepository = new JobRepository(),
    private accountRepository: IAccountRepository = new AccountRepository(),
  ) {}

  public async create(req: JobParams): Promise<Job> {
    try {
      return await this.jobRepository.save(new Job({ name: req.name }));
    } catch (error) {
      throw new Error('Fail to create a new job');
    }
  }

  public async findAll(): Promise<Job[]> {
    try {
      return await this.jobRepository.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async publishJob(id: string): Promise<Job> {
    const job = await this.jobRepository.findOneById(id);
    if (!job) {
      throw new Error('None job found with this id');
    }
    return this.jobRepository.update(new Job({ ...job }).publish());
  }

  public async applyToJob(id: string, accountId: string): Promise<Job> {
    const account = await this.accountRepository.findOneById(accountId);
    if (!account) {
      throw new Error('None Account found with this id');
    }

    const job = await this.jobRepository.findOneById(id);
    if (!job) {
      throw new Error('None job found with this id');
    }

    return this.jobRepository.update(new Job({ ...job }).apply(accountId));
  }

  public async viewApplicationsByJob(id: string): Promise<Account[]> {
    const job = await this.jobRepository.findOneById(id);
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
