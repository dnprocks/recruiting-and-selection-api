import crypto from 'crypto';

export type JobDTO = JobParams;
export interface JobParams {
  id?: string;
  name: string;
  status?: JobStatus;
  applications?: string[];
}

type JobStatus = 'published' | 'draft';
export default class Job {
  id?: string;
  name: string;
  status?: JobStatus;
  applications?: string[] = [];

  constructor({ id, name, status = 'draft', applications = [] }: JobParams) {
    this.id = id || crypto.randomUUID();
    this.name = name;
    this.status = status;
    this.applications = applications;
  }

  public publish() {
    if (this.status === 'published') {
      throw new Error('This job is already published.');
    }
    this.status = 'published';
    return this;
  }

  public apply(accountId: string) {
    if (this.status === 'draft') {
      throw new Error('This job is not published.');
    }
    if (this.applications.includes(accountId)) {
      throw new Error(`This account has already applied for the job`);
    }
    this.applications.push(accountId);
    return this;
  }
}
