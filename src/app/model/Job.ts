import crypto from 'crypto';

type JobStatus = 'open' | 'closed';
export default class Job {
  id?: string;
  name: string;
  status?: JobStatus;
  candidates?: string[] = [];

  constructor(props: Omit<Job, 'id'>, id?: string) {
    if (!id) {
      this.id = crypto.randomUUID();
      this.status = 'open';
    }
    Object.assign(this, props);
  }
}
