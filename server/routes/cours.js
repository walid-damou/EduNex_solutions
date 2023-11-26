const { Router } = require("express");
const addCours = require("../controllers/cours/addCours");
const browseCourse = require("../controllers/cours/browseCourse");
const CheckSuperAdmin = require("../middlewares/checkSuperAdmin");
const browseCoursSoc = require("../controllers/cours/browseCoursSoc");
const checkSociete = require("../middlewares/checkSociete");

const courseCatalogue = require("../controllers/cours/coursCatalague");
const router = Router();
const signedin = require("../middlewares/signedin");
const checkCollaborateur = require("../middlewares/checkCollaborateur");
const browseCourseDetails = require("../controllers/cours/browseCourseDetails");
const browseCoursDetailsSoc = require("../controllers/cours/browseCoursDetailsSoc");
const checkSuperAdmin = require("../middlewares/checkSuperAdmin");

// router.use(signedin);
// Please don't change the order
// Super Admin Links
router.use("/browse", checkSuperAdmin);
router.all("/browse", browseCourse);

router.use("/add", checkSuperAdmin);
router.post("/add", addCours);
// Collaborator routes
router.use("/catalogue", checkCollaborateur);
router.all("/catalogue", courseCatalogue);

router.use("/detail", checkCollaborateur);
router.all("/detail", browseCourseDetails);
// router.use("/add", CheckSuperAdmin);
// router.use("/browse", CheckSuperAdmin);

// router.all("/browse", browseCourse);
router.use(checkSociete);
router.use("/browsesoc", checkSociete);
router.all("/browsesoc", browseCoursSoc);
router.all("/detailsoc", browseCoursDetailsSoc);
module.exports = router;
