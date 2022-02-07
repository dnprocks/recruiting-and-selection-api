import mongoose from 'mongoose';

class Mongoose {
  constructor() {
    this.connect();
  }

  async connect() {
    try {
      await mongoose.connect(`${process.env.MONGO_URL}`, { ssl: false });
      console.log('O pai mongo tá on');
    } catch (error) {
      console.log(error);
    }
  }

  async disconnect() {
    await mongoose.connection.close();
  }
}

export default new Mongoose();
