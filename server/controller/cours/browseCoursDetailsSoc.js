const sequelize = require("../../config/database");
const { Cours, Collaborateur, Session, Provider, Quota } = sequelize.models;
module.exports = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.sendStatus(403);
  }
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
            SocieteId: req.societe,
          },
        },
      },
    ],
    group: ["Cours.id", "Provider.id"],
    attributes: {
      include: [
        [
          sequelize.fn("count", sequelize.col("Sessions->Collaborateurs.id")),
          "collabs",
        ],
      ],
    },
  });
  // console.log(cours);
  return res.send({ status: true, cours });
};
