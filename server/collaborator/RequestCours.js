const sequelize = require("../../config/database");
const Email = require("../../emails/Email");
const socket = require("../../socket");
const { Cours, Collaborateur, Request, User } = sequelize.models;
const io = require("../../socket").get();

module.exports = async (req, res) => {
  const collab = await Collaborateur.findByPk(req.collab);
  if (!collab) {
    return res.sendStatus(403);
  }

  const { cours } = req.body;
  if (!cours) {
    return res.sendStatus(403);
  }
  // try {
  const crs = await Cours.findByPk(cours);
  if (!crs) {
    return res.send({ status: false, msg: "Cours not found" });
  }
  await Request.create({
    CollaborateurId: req.collab,

    CourId: cours,
  });
  const { SocieteId } = collab;
  const emails = await User.findAll({
    raw: true,
    attributes: ["email"],
    include: {
      model: Collaborateur,
      attributes: [],
      where: {
        admin: true,
        SocieteId: SocieteId,
      },
    },
  });
  to_emails = [];
  io.emit("notif", "test");

  // emails.map((email) => to_emails.push(email.email));
  // Email.sendRequest(to_emails, `${collab.prenom} ${collab.nom}`, crs.nom);

  return res.send({ email: "sent", status: true, msg: "Request Created" });
  // } catch (err) {
  //   return res.send({ status: false, msg: "Error" });
  // }
};
