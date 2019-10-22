import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    sparse: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    sparse: true,
    validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    required() {
      return !this.phoneNumber;
    },
  },
  sex: {
    type: String,
    enum: ['Male', 'Female', 'M', 'F', 'MALE', 'FEMALE'],
  },
  firstName: String,
  lastName: String,
  userType: {
    type: String,
    default: 'user',
  },
  phoneNumber: {
    type: String,
    minlength: 10,
    maxlength: 13,
    unique: true,
    trim: true,
    sparse: true,
    required() {
      return !this.email;
    },
  },
  residence: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Users', userSchema);
