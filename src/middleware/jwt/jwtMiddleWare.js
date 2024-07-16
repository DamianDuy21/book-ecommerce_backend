const jwt = require("jsonwebtoken");
require("dotenv").config;
const jwtMiddleWare = (req, res, next) => {
  if (req?.headers?.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);

    //verify
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {
        email: decoded.email,
        username: decoded.username,
      };
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).json({
        ec: 401,
        message: "accessToken is not valid",
      });
    }
  } else {
    // return exception;
    return res.status(401).json({
      ec: 401,
      message: "accessToken is not valid",
    });
  }
};
module.exports = jwtMiddleWare;
