const sequelize = require("sequelize");
const db = require("../../config/database");
const { Societe, Departement, Session_Collab, Proof, Collaborateur } =
  db.models;
module.exports = async (req, res) => {
  try {
    const { paranoid } = req.body;
    const departements = await Departement.findAll({
      paranoid: paranoid !== undefined ? false : true,

      include: [
        { model: Societe, attributes: ["name"], required: true },
        {
          model: Collaborateur,
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
        ],
      },
      // where: { SocieteId: req.societe },
      group: ["Societe.id", "Departement.id"],
    }); // Implementing search
    return res.send({ status: true, data: departements });
  } catch (err) {
    console.log(err);

    return res.send({ status: false });
  }
};
