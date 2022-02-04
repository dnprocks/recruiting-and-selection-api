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

  constructor(props: Omit<JobParams, 'id'>, id?: string) {
    if (!id) {
      this.id = crypto.randomUUID();
      this.status = 'draft';
    }
    Object.assign(this, props);
  }

  public publish() {
    if (this.status === 'published') {
      throw new Error('This job is already published.');
    }
    this.status = 'published';
  }

  public apply(accountId: string) {
    if (this.applications.includes(accountId)) {
      throw new Error(`This account has already applied for the job`);
    }
    this.applications.push(accountId);
  }
}
