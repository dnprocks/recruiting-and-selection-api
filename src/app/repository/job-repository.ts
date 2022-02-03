import Job from '../model/Job';

export interface IJobRepository {
  save(job: Job): any;
  findOne(param: any): any;
}

export const dataBaseMock = new Map<string, object>();

export const jobRepositoryMock: IJobRepository = {
  save: (job: Job) => {
    return new Promise((resolve, reject) => {
      const newJob = new Job({ ...job });
      dataBaseMock.set(newJob.id, newJob);
      resolve(newJob);
    });
  },

  findOne: (param: any) => {
    return dataBaseMock.get(param.email);
  },
};
