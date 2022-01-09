const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
      return res
        .status(400)
        .json({ success: false, message: "Invalid username or password" });

    try {
      const user = await User.findOne({ username });

      if (user)
        return res
          .status(400)
          .json({ success: false, message: "Username already exists" });

      const newUser = new User({
        username: username,
        password: password, // No hash password :D
      });
      await newUser.save((err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json({
            success: true,
            message: "User created successfully",
            user: data,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });
      if (!user)
        return res.status(400).json({
          success: false,
          message: "Incorrect username or password",
          user: null,
        });

      if (password !== user.password) {
        return res.status(400).json({
          success: false,
          message: "Incorrect username or password",
          user: null,
        });
      } else {
        const accessToken = jwt.sign(
          { userId: user._id },
          process.env.ACCESS_TOKEN_SECRET
        );

        res.json({
          success: true,
          message: "Signed in successfully",
          user: user,
          accessToken: accessToken,
        });
      }
    } catch (err) {
      console.log(err);
    }
  },

  getAuth: async (req, res) => {
    try {
      const user = await User.findById(req.userId).select("-password");
      if (!user)
        return res
          .status(400)
          .json({ success: false, message: "User not found", user: null });

      res.json({ success: true, user: user });
    } catch (err) {
      console.log(err);
    }
  },
};
