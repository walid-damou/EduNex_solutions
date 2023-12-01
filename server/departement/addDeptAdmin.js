const db = require("../../config/database");
const { Departement } = db.models;
module.exports = async (req, res) => {
  try {
    const { nom, soc } = req.body;

    if (!nom || !soc) {
      return res.sendStatus(403);
    }
    const departement = await Departement.create({
      nom,
      SocieteId: soc,
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }
  return res.send({ status: true, msg: "Departement Created Successfully" });
};
