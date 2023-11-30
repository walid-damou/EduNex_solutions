const sequelize = require("sequelize");
const db = require("../../config/database");
const { Session_Collab, Proof, Cours, Session, Provider, Collaborateur } =
  db.models;
module.exports = async (req, res) => {
  filters = {};
  const { paranoid } = req.body;
  console.log(paranoid);
  filters.paranoid = paranoid !== undefined ? false : true;
  filters.include = [
    {
      model: Session,
      // required: false,
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
          {
            model: Collaborateur,
            attributes: [],
            where: {
              admin: false,
              instructor: false,
            },
          },
        ],
      },
      // ],
    },
    {
      model: Provider,
      required: true,
      attributes: ["id", "nom"],
    },
  ];
  filters.attributes = {
    include: [
      [
        sequelize.fn(
          "count",
          sequelize.fn("distinct", sequelize.col("Sessions.id"))
        ),
        "sessions",
      ],
      [
        sequelize.fn(
          "count",
          // sequelize.fn(
          //   "distinct",
          sequelize.col("Sessions->Session_Collabs->Collaborateur.id")
          // )
        ),
        "collabs",
      ],
      [
        sequelize.fn(
          "count",
          sequelize.fn(
            "distinct",
            sequelize.col("Sessions->Session_Collabs->certifs.id")
          )
        ),
        "collabs_fin",
      ],
    ],
  };
  filters.group = ["Cours.id", "Provider.id", "Cours.createdAt"];
  filters.order = [["createdAt", "DESC"]];
  if (req.method == "POST") {
    const { search, provider } = req.body;

    if (search) {
      filters.attributes.include.push([
        sequelize.fn("similarity", sequelize.col("Cours.nom"), search),
        "score",
      ]);
      filters.where = [
        sequelize.where(
          sequelize.fn("similarity", sequelize.col("Cours.nom"), search),
          { [sequelize.Op.gt]: 0.1 }
        ),
      ];
    }

    if (provider) {
      if (filters.where) {
        temp = filters.where;
        filters.where = {
          [sequelize.Op.and]: [filters.where, { ProviderId: provider }],
        };
      } else {
        filters.where = { ProviderId: provider };
      }
    }
    try {
      const cours = await Cours.findAll(filters); // Implementing search
      return res.json(cours);
    } catch (err) {
      return res.send({ status: "error" });
    }
  } else {
    console.log(filters);
    const cours = await Cours.findAll(filters); // Implementing search
    return res.json(cours);
  }
};
