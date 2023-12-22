const sequelize = require("sequelize");
const db = require("../../config/database");
const { Voucher, Provider, Societe } = db.models;

module.exports = async (req, res) => {
  try {
    const vouchers = await Voucher.findAll({
      attributes: ["id", "code"],
      include: [
        {
          model: Provider,
		required:true,
          attributes: ["id", "nom", "image"],
        },
        {
          model: Societe,
          attributes: ["id", "name"],
	  required: true,
        },
      ],
      where: {
        SessionCollabId: null,
      },
      order: [
	      ["createdAt","DESC"],
        ["Provider", "id"],
        ["Societe", "id"],
      ],
    });
    return res.send(vouchers);
  } catch (error) {
    return res.send({ status: false });
  }
 
};


