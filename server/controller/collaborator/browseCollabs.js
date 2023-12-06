const sequelize = require("sequelize");
const db = require("../../config/database");
const { Collaborateur, Session_Collab, Proof } = db.models;

module.exports = async (req, res) => {
  const collabs = await Collaborateur.findAll({
    include: [
      {
        model: Session_Collab,
        attributes: [],
        include: {
          attributes: [],
          model: Proof,
          as: "certifs",
          where: {
            status: "accepted",
          },
        },
      },
    ],
    attributes: {
      include: [
        [
          sequelize.fn("count", sequelize.col("Session_Collabs.id")),
          "session_count",
        ],
        [
          sequelize.fn("count", sequelize.col("Session_Collabs->certifs.id")),
          "certifs_count",
        ],
      ],
    },
    where: { admin: false, instructor: false, SocieteId: req.societe },
    group: ["Collaborateur.id"],
  });
  return res.send(collabs);
};
