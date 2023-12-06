const sequelize = require("sequelize");
const db = require("../../config/database");
const { Societe, Session,Collaborateur, Session_Collab, Proof } = db.models;

module.exports = async (req, res) => {
  const collabs = await Collaborateur.findAll({
    paranoid: false,
    include: [
      {
        model: Session,
	      through:{

		      attributes:[]
	      },
        required: false,
        attributes: [],
      },
      {
        model: Societe,
        required: true,
        attributes: ["name"],
      },
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
          sequelize.fn("count", sequelize.col("Sessions.id")),
          "session_count",
        ],
        [
          sequelize.fn("count", sequelize.col("Session_Collabs->certifs.id")),
          "certifs_count",
        ],
      ],
    },
    where: { admin: false, instructor: false },
    group: ["Collaborateur.id", "Societe.id"],
	  order:[["createdAt","DESC"]]
  });
  return res.send(collabs);
};
