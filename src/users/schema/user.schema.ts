import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

ERROR 11000 Duplicate email

{
  error: ""
}

ExceptionFilter