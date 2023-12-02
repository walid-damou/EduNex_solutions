const db = require("../../config/database");
const { Cours, Societe, Provider } = db.models;
module.exports = async (req, res) => {
  const { model } = req.body;
  if (model == "cours") {
    Model = Cours;
  } else if (model == "societe") {
    Model = Societe;
  } else if (model == "provider") {
    Model = Provider;
  } else {
    return res.sendStatus(404);
  }
  count = await Model.count();
  return res.send({
    count,
  });
};
