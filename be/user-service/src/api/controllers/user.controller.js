const { OK, CREATED } = require("../../common/successResponse");

class UserController {
  async getUsers(req, res) {
    return OK({
      res,
      metadata: req.user,
    });
  }
  async getUserById(req, res) {
    return OK({
      res,
      metadata: req.user,
    });
  }
  async getMe(req, res) {
    return OK({
      res,
      metadata: req.user,
    });
  }
  async createUser(req, res) {
    return CREATED({
      res,
      metadata: req.body,
    });
  }
  async updateUser(req, res) {
    return OK({
      res,
      metadata: req.body,
    });
  }
}

module.exports = new UserController();
