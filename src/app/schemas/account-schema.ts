import mongoose from 'mongoose';
import Account from '../model/account';
import bcrypt from 'bcryptjs';

const accountSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 150,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    select: false,
    maxlength: 255,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

accountSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

const AccountSchema = mongoose.model<Account>(`account`, accountSchema);
export default AccountSchema;
