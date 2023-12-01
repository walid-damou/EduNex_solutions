const { Op } = require("sequelize");
const db = require("../../config/database");
const Email = require("../../emails/Email");
const { Cours, Collaborateur, Request, Session, Quota, Provider, User } =
  db.models;
module.exports = async (req, res) => {
  const { session, collab, request, requestid } = req.body;
  if (!session || !collab) {
    return res.sendStatus(403);
  }

  // try {
  const sess = await Session.findByPk(session, {
    where: {
      SocieteId: req.societe,
    },
    include: [
      {
        model: Cours,
        required: true,
        include: [
          {
            model: Provider,
            required: true,
            include: [
              {
                model: Quota,
                required: true,
                where: {
                  SocieteId: req.societe,
                  quota: {
                    [Op.gt]: 0,
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  });
  if (!sess) {
    return res.sendStatus(403);
  }
  const collabo = await Collaborateur.findOne({
    where: {
      id: collab,
      SocieteId: req.societe,
    },
  });
  if (!collabo) {
    return res.send({
      status: false,
      msg: "Collab Doesn't exist in your company",
    });
  }
  const user = await User.findByPk(collabo.UserId);
  const { email } = user;
  sess.addCollaborateur(collabo);
  sess.Cour.Provider.Quota[0].quota--;
  sess.Cour.Provider.Quota[0].save();

  const { nom } = await Session.findByPk(session);

  if (request && requestid) {
    const reqs = await Request.findOne({
      where: {
        id: requestid,
      },
    });
    console.log("collab request: ", reqs);
    reqs.status = "accepted";
    await reqs.save();

    // Email.sendAccepteResponse(email, "accepted", cours.nom, nom);
  } else {
    // Email.sendAddToSession(email, nom);
  }

  return res.send({
    status: true,
    msg: "Collab Added",
  });
  // } catch (err) {
  //   return res.send({ status: false, msg: "Check your quota" });
  // }
};
