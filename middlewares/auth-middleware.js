const jwt = require("jsonwebtoken");
const Users = require("../models/users");

module.exports = (req, res, next) => {
  console.log("미들웨어를 지나가유");
  const { authorization } = req.headers;
  console.log(authorization);
  const [tokenType, tokenValue] = authorization.split(" ");
  // console.log(tokenValue);

  if (tokenType !== "Bearer") {
    res.status(401).send({
      errorMessage: "로그인 후 사용하세요",
    });
    return;
  }

  try {
    const { userId } = jwt.verify(tokenValue, "my-secret-key");

    Users.findOne({ userId }).then((users) => {
      res.locals.users = users;
      // console.log("미들웨어 내부: " + users);
      next();
    });
  } catch (error) {
    res.status(401).send({
      errorMessage: "로그인 후 사용하세요",
    });
    return;
  }
};
