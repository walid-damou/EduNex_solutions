const { Router } = require("express");
const signedin = require("../middlewares/signedin");
const amcards = require("../controllers/dashboard/amcards");
const amgraphs = require("../controllers/dashboard/amgraphs");
const ampdash = require("../controllers/dashboard/ampdash");
const amtable = require("../controllers/dashboard/amtable");
const amtop = require("../controllers/dashboard/amtop");
const checkSociete = require("../middlewares/checkSociete");
const soccards = require("../controllers/dashboard/soccards");
const socCollabTable = require("../controllers/dashboard/socCollabTable");
const collabDashboard = require("../controllers/dashboard/collabDashboard");
const checkCollaborateur = require("../middlewares/checkCollaborateur");
const checkSuperAdmin = require("../middlewares/checkSuperAdmin");
const socGraph = require("../controllers/dashboard/socGraph");
const socQuota = require("../controllers/dashboard/socQuota");

// router.use(signedin);

const router = Router();
router.use("/amcards", checkSuperAdmin);
router.post("/amcards", amcards);
router.use("/amtable", checkSuperAdmin);
router.post("/amtable", amtable);
router.use("/amgraphs", checkSuperAdmin);
router.post("/amgraphs", amgraphs);
router.use("/topcourses", checkSuperAdmin);
router.post("/topcourses", amtop);
// Collab dash

router.use("/collab", checkCollaborateur);
router.get("/collab", collabDashboard);
// Societe Dash
router.use(checkSociete);
router.post("/soccards", soccards);
router.post("/soccollab", socCollabTable);
router.post("/socgraph", socGraph);
router.post("/socquota", socQuota);
module.exports = router;
