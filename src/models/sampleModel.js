import mongoose from 'mongoose';

const sampleSchema = new mongoose.Schema({
  username: String,
  password: String,
});

export default mongoose.model('Sample', sampleSchema);
