const { Router } = require("express");
const addSession = require("../controllers/session/addSession");
const addSessionAdmin = require("../controllers/session/addSessionAdmin");
const browseSession = require("../controllers/session/browseSession");
const browseSessionAdmin = require("../controllers/session/browseSessionAdmin");
const browseSessionsCollab = require("../controllers/session/browseSessionsCollab");
const browseSessionSoc = require("../controllers/session/browseSessionSoc");
const SessionCollab = require("../controllers/session/SessionCollab");
const SessionDetailsGraph = require("../controllers/session/SessionDetailsGraph");
const browseSessionnotEnrolled = require("../controllers/session/browseSessionnotEnrolled");
const checkCollaborateur = require("../middlewares/checkCollaborateur");
const checkSociete = require("../middlewares/checkSociete");
const checkSuperAdmin = require("../middlewares/checkSuperAdmin");
const router = Router();
const signedin = require("../middlewares/signedin");

// router.use(signedin);
// ampresta
router.use("/browseam", checkSuperAdmin);
router.all("/browseam", browseSessionAdmin);
router.use("/addam", checkSuperAdmin);
router.post("/addam", addSessionAdmin);
//collab
router.use("/browsecollab", checkCollaborateur);
router.all("/browsecollab", browseSessionsCollab);
//soc
router.use(checkSociete);
router.post("/browsesoc", browseSessionSoc);
router.post("/add", addSession);
router.all("/browse", browseSession);
router.post("/graph", SessionDetailsGraph);
router.post("/collab", SessionCollab);
router.post("/sessionout", browseSessionnotEnrolled);

router.post("/sessionout", browseSessionnotEnrolled);
module.exports = router;
