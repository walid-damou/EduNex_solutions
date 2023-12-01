const db = require("../../config/database");
const { Cours, Provider } = db.models;
module.exports = async (req, res) => {
  companies = await Cours.findAll({
    include: {
      model: Provider,
      required: true,
      attributes: ["nom"],
    },
    attributes: ["nom", "image"],
    order: [["createdAt","DESC"]],
    limit: 3,
	  subQuery:false,
  });

  return res.send({
    companies,
  });
};
