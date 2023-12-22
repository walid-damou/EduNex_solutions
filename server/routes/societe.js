const browseDept = require("../controllers/departement/browseDept");
const addSociete = require("../controllers/societe/addSociete");
const associateAdminSociete = require("../controllers/societe/associateAdminSociete");
const browseCollab = require("../controllers/societe/browseCollab");
const browseRequests = require("../controllers/societe/browseRequests");
const browseSociete = require("../controllers/societe/browseSociete");
const CreateCollabAdmin = require("../controllers/societe/CreateCollabAdmin");
const CreateCollabsforSociete = require("../controllers/societe/CreateCollabsforSociete");
const CreateOneCollabforSociete = require("../controllers/societe/CreateOneCollabforSociete");
const getUerSociete = require("../controllers/societe/getUerSociete");
const restore_societe = require("../controllers/societe/restore_societe");
const checkSociete = require("../middlewares/checkSociete");
const router = require("express").Router();
const checkSuperAdmin = require("../middlewares/checkSuperAdmin");
const signedin = require("../middlewares/signedin");

// router.use(signedin);

router.use("/restore", checkSuperAdmin);
router.post("/restore", restore_societe);

router.post("/add", addSociete);
router.all("/browse", browseSociete);
router.post("/assign", associateAdminSociete);
router.post("/uerSociete", getUerSociete);
router.post("/addcollabadmin", CreateCollabAdmin);
//Societe
router.use(checkSociete);

router.post("/addcollabs", CreateCollabsforSociete);
router.post("/addcollab", CreateOneCollabforSociete);
router.get("/browserequests", browseRequests);

// router.get("/browsecollabs", browseCollab);

router.all("/browsedepts", browseDept);
// AM

module.exports = router;
