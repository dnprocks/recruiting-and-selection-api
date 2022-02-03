import Job from '../model/job';

export interface IJobRepository {
  save(job: Job): any;
  findOne(param: any): Promise<Job>;
  update(job: Job): Promise<Job | any>;
  findAll();
}

export const dataBaseMock = new Map<string, object>();

export const jobRepositoryMock: IJobRepository = {
  save: async (job: Job) => {
    return new Promise((resolve, reject) => {
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

  findAll: function () {
    return Array.from(dataBaseMock.values());
  },
};
