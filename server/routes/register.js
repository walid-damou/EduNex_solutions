const refreshtoken = require("../controllers/login/refreshtoken");
const register = require("../controllers/register/register");
const registerSuperAdmin = require("../controllers/register/registerSuperAdmin");
const router = require("express").Router();
const signedin = require("../middlewares/signedin");

// Routing

// router.use(signedin);
router.post("/", register);
router.post("/superadmin", registerSuperAdmin);
router.get("/refreshtoken", refreshtoken);

module.exports = router;
