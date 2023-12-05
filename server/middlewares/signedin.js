const { verify } = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.send({ msg: "no header" });
    }
    token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.sendStatus(403);
    }
    payload = verify(token, process.env.JWTSALT);
    return next();
  } catch (err) {
    return res.sendStatus(401);
  }
};
