import { IJobRepository } from '../../app/repository/job-repository';
import Job from '../../app/model/job';

export const dataBaseMock = new Map<string, Job>();

export const jobRepositoryMock: IJobRepository = {
  save: async (job: Job): Promise<Job> => {
    return new Promise(resolve => {
      const newJob = new Job({ ...job });
      dataBaseMock.set(newJob.id, newJob);
      resolve(newJob);
    });
  },

  findOneById: async (id: any): Promise<any> => {
    return dataBaseMock.get(id);
  },

  update: async (job: Job): Promise<any> => {
    dataBaseMock.set(job.id, job);
    return dataBaseMock.get(job.id);
  },

  findAll: async (): Promise<Job[]> => {
    return Array.from(dataBaseMock.values());
  },
};
