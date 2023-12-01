const { Op } = require("sequelize");
const sequelize = require("../../config/database");
const { Provider, Quota, Cours, Collaborateur } = sequelize.models;
module.exports = async (req, res) => {
  const { provider } = req.body;
  const collab = await Collaborateur.findOne({
    where: { id: req.collab },
  });
  if (!collab) {
    console.log("\x1b[42mCOLLAB\x1b[0m");
    console.log(req.collab);
    return res.send({ status: false, msg: "Collab Not found" });
  }
  if (provider) {
    let t = [];
    for (i of provider) {
      t.push({
        id: i,
      });
    }
    filters = {
      include: {
        model: Provider,
        where: {
          [Op.or]: t,
        },
        attributes: ["nom"],
        required: true,
        include: {
          model: Quota,

          where: {
            SocieteId: collab.SocieteId,
            quota: {
              [Op.gt]: 0,
            },
          },
        },
      },
    };
  } else {
    filters = {
      include: {
        model: Provider,
        attributes: ["nom"],
        required: true,
        include: {
          model: Quota,
          where: {
            SocieteId: collab.SocieteId,
          },
        },
      },
    };
  }
  const cours = await Cours.findAll(filters);
  return res.send({ status: true, cours });
};
