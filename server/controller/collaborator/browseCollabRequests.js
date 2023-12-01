const sequelize = require("sequelize");
const db = require("../../config/database");
const { Collaborateur, Cours, Request } = db.models;
module.exports = async (req, res) => {
  try {
    const requests = await Request.findAll({
      include: [
        {
          model: Cours,
          required: true,
          attributes: ["id", "nom", "image"],
        },
        {
          model: Collaborateur,
          attributes: [],
          where: {
            id: req.collab,
          },
        },
      ],
    });
    return res.send({ status: true, requests });
  } catch (err) {

    return res.send({ status: false });
  }
};
