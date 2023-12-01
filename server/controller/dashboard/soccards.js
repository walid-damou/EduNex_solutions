const db = require("../../config/database");
const { Challenge, Collaborateur, Session } = db.models;
module.exports = async (req, res) => {
  const { model } = req.body;
  filters = {
    where: {
      SocieteId: req.societe,
    },
  };
  if (model == "challenge") {
    Model = Challenge;
  } else if (model == "collab") {
	  filters.where.admin=false
    Model = Collaborateur;
  } else if (model == "session") {
    Model = Session;
  } else {
    return res.sendStatus(404);
  }
  count = await Model.count(filters);
  return res.send({
    count,
  });
};
