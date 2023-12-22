const db = require("../../config/database");
const { Departement } = db.models;
module.exports = async (req, res) => {
  try {
    const { nom } = req.body;

    if (!nom) {
      return res.sendStatus(403);
    }
    const departement = await Departement.create({
      nom,
      SocieteId: req.societe,
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }
  return res.send({ status: true, msg: "Departement Created Successfully" });
};
