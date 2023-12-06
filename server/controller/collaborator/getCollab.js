const db = require("../../config/database");
const { Collaborateur, User } = db.models;

module.exports = async (req, res) => {
  const collab = await Collaborateur.findOne({
    where: { id: req.collab },
    include: {
      model: User,
      attributes: ["email", "username"],
    },
  });
  if (!collab) {
    return res.send({ status: false });
  }
  return res.send({ status: true, collab });
};
