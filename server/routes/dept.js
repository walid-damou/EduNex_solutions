const router = require("express").Router();

const addDept = require("../controllers/departement/addDept");
const addDeptAdmin = require("../controllers/departement/addDeptAdmin");
const browsDeptAdmin = require("../controllers/departement/browsDeptAdmin");

const checkSociete = require("../middlewares/checkSociete");
const checkSuperAdmin = require("../middlewares/checkSuperAdmin");
// Societe
router.use("/add", checkSociete);
router.post("/add", addDept);
//AM PRESTA
router.use(checkSuperAdmin);
router.all("/browsedeptsam", browsDeptAdmin);
router.post("/adminadd", addDeptAdmin);

module.exports = router;
