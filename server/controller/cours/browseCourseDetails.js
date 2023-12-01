const sequelize = require("../../config/database");
const { Cours, Collaborateur, Session, Provider, Quota } = sequelize.models;
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.sendStatus(403);
  }
  const collab = await Collaborateur.findOne({
    where: {
      id: req.collab,
    },
  });
  const cours = await Cours.findOne({
    where: { id },
    include: [
      {
        model: Session,
        // required: false,
        attributes: [],
        include: {
          model: Collaborateur,
          through: {
            attributes: [],
          },
          attributes: [],
          where: {
            admin: false,
            instructor: false,
          },
        },
      },
      // ],
      {
        model: Provider,
        required: true,
        attributes: ["id", "image", "nom"],
        include: {
          model: Quota,
          attributes: [],
          required: false,
          where: {
            SocieteId: collab.SocieteId,
		  quota:{
			  [Op.gt]:0}
          },
        },
      },
      {
        model: Collaborateur,
        attributes: [],
        through: {
          required: false,
          where: {
            status: "pending",
          },
          attributes: [],
        },
        where: {
          id: req.collab,
        },
        required: false,
      },
    ],
    group: ["Cours.id", "Provider.id"],
    attributes: {
      include: [
        [sequelize.fn("count", sequelize.col("Collaborateurs.id")), "request"],
        [
          sequelize.fn("count", sequelize.col("Sessions->Collaborateurs.id")),
          "collabs",
        ],
        [
          sequelize.fn(
            "count",
            sequelize.fn("distinct", sequelize.col("Provider->Quota.id"))
          ),
          "enroll",
        ],
      ],
    },
  });
  // console.log(cours);
  return res.send({ status: true, cours });
};
