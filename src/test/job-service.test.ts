import { faker } from '@faker-js/faker';
import { jobRepositoryMock } from '../../src/app/repository/job-repository';
import { JobService } from '../../src/app/service/job-service';

describe('Create a new Job', () => {
  const serviceJob = new JobService(jobRepositoryMock);

  test('creating a new job', async () => {
    const job = await serviceJob.create({
      name: faker.hacker.phrase(),
    });
    console.log(job);
    expect(job).toHaveProperty('id');
  });
});
