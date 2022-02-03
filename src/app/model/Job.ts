import crypto from 'crypto';

export interface JobParams {
  id?: string;
  name: string;
  status?: JobStatus;
  candidates?: string[];
}

type JobStatus = 'open' | 'closed';
export default class Job {
  id?: string;
  name: string;
  status?: JobStatus;
  candidates?: string[] = [];

  constructor(props: Omit<JobParams, 'id'>, id?: string) {
    if (!id) {
      this.id = crypto.randomUUID();
      this.status = 'closed';
    }
    Object.assign(this, props);
  }

  public openJob() {
    if (this.status === 'open') {
      throw new Error('This job is already published.');
    }
    this.status = 'open';
  }
}
