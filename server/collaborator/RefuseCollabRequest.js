const sequelize = require("../../config/database");
const Email = require("../../emails/Email");
const { Request, User, Collaborateur, Cours } = sequelize.models;
module.exports = async (req, res) => {
  const { id } = req.body;
  const request = await Request.findOne({
    where: { id },
  });
  if (!request) {
    return res.send({ status: false });
  }
  request.status = "refused";
  await request.save();

  const {nom} = await Cours.findOne({
    attributes: ["nom"],
    include: {
      attributes: [],
      model: Request,
      where: {
        id: id,
      },
    },
  });

  let [[user_email]] = await sequelize.query(`
    SELECT email
    FROM "Users" u
    JOIN "Collaborateurs" c ON u.id = c."UserId"
    JOIN "Requests" r ON c.id = r."CollaborateurId"
    WHERE r.id = ${id}
  `);

  const { email } = user_email;

  // Email.sendRefuseResponse(email, request.status, nom);

  return res.send({ nom, status: true });
};
