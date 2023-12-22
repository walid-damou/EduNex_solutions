const { Router } = require("express");
const addQuota = require("../controllers/quota/addQuota");
const browseQuota = require("../controllers/quota/browseQuota");
const modifyQuota = require("../controllers/quota/modifyQuota");
const browseQuotaBySoc = require("../controllers/societe/browseQuotaBySoc");
const checkSuperAdmin = require("../middlewares/checkSuperAdmin");

const r = Router();
// const signedin = require("../middlewares/signedin");

// r.use(checkSuperAdmin);

r.post("/add", addQuota);

r.post("/modify", modifyQuota);
r.post("/browse", browseQuota);
r.get("/browsesoc", browseQuotaBySoc);
module.exports = r;
