const User = require("../models/user.model");

class AuthController {
  async register(req, res) {
    const { name, email, password } = req.body;
    const holdUser = await User.findOne({ email });
    if (holdUser) {
      return res.status(401).json({ message: "Email already exists" });
    }
    const user = await User.create({ name, email, password });
    const token = user.generateToken();
    res.status(201).json({ token, user: user.toJSON() });
  }
  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = user.generateToken();
    res.json({ token, user: user.toJSON() });
  }
}

module.exports = new AuthController();
