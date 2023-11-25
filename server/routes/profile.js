const { Router } = require("express");
const getProfile = require("../controllers/profile/getProfile");
const updateProfile = require("../controllers/profile/updateProfile");
const validate_password = require("../controllers/profile/validate_password");
const router = Router();

const checkCollaborateur = require("../middlewares/checkCollaborateur");

router.use("/", checkCollaborateur);
router.post("/", getProfile);

router.use("/update", checkCollaborateur);
router.post("/update", updateProfile);

router.use("/validatepassword", checkCollaborateur);
router.post("/validatepassword", validate_password);



module.exports = router;
