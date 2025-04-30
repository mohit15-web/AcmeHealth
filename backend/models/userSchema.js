import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  patientName: { type: String, required: true }  // Added patientName
});

export default mongoose.model('User', userSchema);
