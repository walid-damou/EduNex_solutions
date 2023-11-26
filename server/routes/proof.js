const { Router } = require("express");
const multer = require("multer");
const acceptProof = require("../controllers/proof/acceptProof");
const getProof = require("../controllers/proof/getProof");
const refuseProofs = require("../controllers/proof/refuseProofs");
const setProof = require("../controllers/proof/setProof");
const checkCollaborateur = require("../middlewares/checkCollaborateur");
const checkSuperAdmin = require("../middlewares/checkSuperAdmin");

const checkSociete = require("../middlewares/checkSociete");
// FILE STORAGE
const STORAGE = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./media/proofs");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: STORAGE });
const router = Router();

router.use("/set", checkCollaborateur);
router.post("/set", upload.single("proof"), setProof);

router.use(checkSociete);
router.post("/refuse", refuseProofs);
router.post("/accept", acceptProof);
router.post("/get", getProof);

module.exports = router;
