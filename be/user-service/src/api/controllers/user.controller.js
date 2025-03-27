class UserController {
  async getUsers(req, res) {
    res.send("Get list users");
  }
  async getUserById(req, res) {
    res.send("Get user by id");
  }
  async getMe(req, res) {
    res.json(req.user);
  }
  async createUser(req, res) {
    res.send("Create a user");
  }
  async updateUser(req, res) {
    res.send("Update the user");
  }
}

module.exports = new UserController();
