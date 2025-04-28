const mongoose = require("mongoose");
const { pick } = require("lodash");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ROLES } = require("../../common/constant");
// Define the schema for the user model
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: "user",
    },
    avatar: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

userSchema.methods.getPublicFields = function () {
  return pick(this, [
    "_id",
    "name",
    "email",
    "role",
    "avatar",
    "phone",
    "address",
  ]);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
