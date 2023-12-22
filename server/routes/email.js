const { Router } = require("express");
const Email = require("../emails/Email");
const router = Router();
const checkSociete = require("../middlewares/checkSociete");

router.use(checkSociete);
router.post("/send", (req, res) => {
  const { email, subject, message } = req.body;
  if (!email || !subject || !message) return res.sendStatus(403);
  Email.sendCustom(email, subject, message);
  res.sendStatus(200);
});

module.exports = router;
