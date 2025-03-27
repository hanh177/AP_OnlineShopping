const mongoose = require("mongoose");
const { pick } = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Define the schema for the user model
// Just sample fields, you can add more fields as needed

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
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

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.APP_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

userSchema.methods.getPublicFields = function () {
  return pick(this, ["_id", "name", "email"]);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
