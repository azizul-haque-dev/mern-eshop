import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    imageInfo: {
      avatar: {
        type: String,
        required: true
      },
      cloudinaryId: {
        type: String,
        required: true
      }
    },
    address: {
      type: Array,
      default: []
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
    }
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare passwords
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Check if email already exists
userSchema.statics.isEmailTaken = async function (email) {
  const user = await this.findOne({ email });
  return !!user;
};

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
