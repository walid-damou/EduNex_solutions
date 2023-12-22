const { Router } = require("express");
const addProvider = require("../controllers/provider/addProvider");
const browseProvider = require("../controllers/provider/browseProvider");
const checkSuperAdmin = require("../middlewares/checkSuperAdmin");

const router = Router();
const signedin = require("../middlewares/signedin");

router.use("/add", checkSuperAdmin);
router.post("/add", addProvider);
router.use(signedin);
router.get("/browse", browseProvider);

module.exports = router;
