const { verify } = require("jsonwebtoken");
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.send({ msg: "no header" });
  }
  token = req.headers.authorization.split(" ")[1];
  if (!token) {
    console.log("\x1b[36mLOG:\x1b[0m");
    console.log(req.headers.authorization);
    return res.sendStatus(403);
  }
  try {
    payload = verify(token, process.env.JWTSALT);
    if (payload.type === "Societe") {
      req.societe = payload.id;
      return next();
    } else {
      return res.send({ status: false, msg: "Not a Societe" });
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(401);
  }
};
