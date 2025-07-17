import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: [true, "name required"],
  },
  email: {
    type: String,
    require: [true, "email required"],
    unique: true,
    lowercase: true,
  },
  phone: String,
  password:{
    type:String,
    require: [true, 'password required'],
    minlength: [8, 'Too short password'],
  },
  role: { type: String, enum: ["admin", "vendor", "user"], default: "user" },
  profileImage: String,
}, {timestamps: true});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema)

