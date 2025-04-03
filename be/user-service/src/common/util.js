const mongoose = require("mongoose");

const toObjectId = (id) => {
  if (!id) {
    return null;
  }
  if (mongoose.Types.ObjectId.isValid(id)) {
    return new mongoose.Types.ObjectId(id);
  }
  return null;
};

module.exports = {
  toObjectId,
};
