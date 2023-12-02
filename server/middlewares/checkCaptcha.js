require("dotenv").config({ path: "../.env" });
const request = require("request");

module.exports = (req, res, next) => {
  // return next();
  const { captcha } = req.body;
  if (!captcha || captcha === undefined || captcha === null) {
    return res.json({
      status: false,
      msg: "Please select captcha",
    });
  }
  try {
    const secretKey = process.env.CAPTCHA_SECRET_KEY;
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}&remoteip=${req.connection.remoteAddress}`;
    request(verifyUrl, (err, response, body) => {
      body = JSON.parse(body);
      if (body.success !== undefined && !body.success) {
        return res.json({
          status: false,
          msg: "Failed captcha verification",
        });
      }
      next();
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(401);
  }
};
