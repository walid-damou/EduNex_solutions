const sequelize = require("../../config/database");

const { Quota, Provider } = sequelize.models;
module.exports = async (req, res) => {
  const quota = await Quota.findAll({
    attributes: ["quota"],
    where: {
      SocieteId: req.societe,
    },
    include: {
      model: Provider,
	    required:true,
      attributes: ["nom", "image"],
    },
  });
  const providers = [];
  const quotas = [];
  const images = [];
  quota.forEach((e) => {
    providers.push(e.Provider.nom);
    quotas.push(e.quota);
    images.push(e.Provider.image);
  });
  return res.send({ status: true, images, providers, quotas });
};
