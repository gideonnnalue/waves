const { User } = require("../models/Users");

const auth = (req, res, next) => {
  let token = req.cookies.w_auth;
  let user = User;

  User.findByToken(user, token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true
      });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
