import mongoose from 'mongoose';
import { JobParams } from '../model/job';

const jobSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 255,
  },
  status: {
    type: String,
    required: true,
    enum: ['published', 'draft'],
    default: 'draft',
    index: true,
  },
  applications: [
    {
      type: String,
      required: false,
      maxlength: 255,
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
});

const JobSchema = mongoose.model<JobParams>(`job`, jobSchema);
export default JobSchema;
