const { Op } = require("sequelize");
const sequelize = require("../../config/database");
const { Provider, Quota, Cours, Collaborateur } = sequelize.models;
module.exports = async (req, res) => {
  const { provider } = req.body;
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
          required: false,
          where: {
            SocieteId: req.societe,
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
          required: false,
          where: {
            SocieteId: req.societe,
          },
        },
      },
    };
  }
  const cours = await Cours.findAll(filters);
  return res.send({ status: true, cours });
};
