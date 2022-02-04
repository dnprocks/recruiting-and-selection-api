import Job from '../../../src/app/model/job';

export interface IJobRepository {
  save(job: Job): Promise<Job>;
  findOne(param: any): Promise<Job>;
  update(job: Job): Promise<Job>;
  findAll(): Promise<Job[]>;
}

export const dataBaseMock = new Map<string, Job>();

export const jobRepositoryMock: IJobRepository = {
  save: async (job: Job): Promise<Job> => {
    return new Promise(resolve => {
      const newJob = new Job({ ...job });
      dataBaseMock.set(newJob.id, newJob);
      resolve(newJob);
    });
  },

  findOne: async (param: any): Promise<any> => {
    return dataBaseMock.get(param.id);
  },

  update: async (job: Job): Promise<any> => {
    dataBaseMock.set(job.id, job);
    return dataBaseMock.get(job.id);
  },

  findAll: async (): Promise<Job[]> => {
    return Array.from(dataBaseMock.values());
  },
};
