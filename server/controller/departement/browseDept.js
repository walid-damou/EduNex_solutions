const sequelize = require("sequelize");
const db = require("../../config/database");
const { Departement, Session_Collab, Proof, Collaborateur } = db.models;
module.exports = async (req, res) => {
  try {
    const departements = await Departement.findAll({
      include: [
        {
          model: Collaborateur,
		order:[["createdAt","DESC"]],
          attributes: [],
          include: {
            model: Session_Collab,
            attributes: [],
            include: [
              {
                model: Proof,
                attributes: [],
                as: "certifs",
                required: false,
                where: {
                  status: "accepted",
                },
              },
            ],
          },
        },
      ],
      attributes: {
        include: [
          [
            sequelize.fn("count", sequelize.col("Collaborateurs.id")),
            "collab_count",
          ],
          [
            sequelize.fn(
              "count",
              sequelize.col("Collaborateurs.Session_Collabs->certifs.id")
            ),
            "challenge_count",
          ],
        ],
      },
      where: { SocieteId: req.societe },
      group: ["Departement.id"],
    }); // Implementing search
    return res.send({ status: true, data: departements });
  } catch (err) {
    console.log(err);

    return res.send({ status: false });
  }
};
