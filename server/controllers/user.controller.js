const User = require("../models/user");

module.exports = {
  findUserIdByUsername: async (username) => {
    try {
      const result = await User.findOne({ username: username });

      if (result) return result._id;
    } catch (error) {}
  },
};
