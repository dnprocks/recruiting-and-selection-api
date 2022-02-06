import { faker } from '@faker-js/faker';
import { AccountService } from '../../src/app/service/account-service';
import { JobService } from '../../src/app/service/job-service';
import { newAccount } from './account-service.test';
import { accountRepositoryMock } from './mock/account-repository-mock';
import { jobRepositoryMock } from './mock/job-repository-mock';

describe('Job validations', () => {
  const serviceJob = new JobService(jobRepositoryMock, accountRepositoryMock);
  const serviceAccount = new AccountService(accountRepositoryMock);
  let job;
  let account;
  beforeAll(async () => {
    account = await serviceAccount.create({
      ...newAccount(),
    });

    job = await serviceJob.create({
      name: faker.hacker.phrase(),
    });
  });

  test('creating a new job', async () => {
    expect(job).toHaveProperty('id');
  });

  test('apply to invalid job', async () => {
    try {
      await serviceJob.applyToJob('invalid_id', account.id);
    } catch (error) {
      expect(error.message).toStrictEqual('None job found with this id');
    }
  });

  test('apply to valid job with invalid account', async () => {
    try {
      await serviceJob.applyToJob(job.id, 'invalid_account');
    } catch (error) {
      expect(error.message).toStrictEqual('None Account found with this id');
    }
  });

  test('apply to job not published', async () => {
    try {
      await serviceJob.applyToJob(job.id, account.id);
    } catch (error) {
      expect(error.message).toStrictEqual('This job is not published.');
    }
  });

  test('publishing a job', async () => {
    expect(job.status).toStrictEqual('draft');
    const publish = await serviceJob.publishJob(job.id);
    expect(publish.status).toStrictEqual('published');
  });

  test('apply to job', async () => {
    const application = await serviceJob.applyToJob(job.id, account.id);
    expect(application.applications[0]).toStrictEqual(account.id);
  });
});
