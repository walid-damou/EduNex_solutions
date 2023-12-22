const cookieParser = require("cookie-parser");
const { Router } = require("express");
const logout = require("../controllers/logout/logout");
const router = Router();
router.use(cookieParser());

router.post("/", logout);
module.exports = router;
