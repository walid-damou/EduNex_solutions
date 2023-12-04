const { Op } = require("sequelize");
const db = require("../../config/database");
const { Session_Collab, Voucher, Proof, Session, Cours } = db.models;
module.exports = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.sendStatus(403);
  }
  try {
    const sess_collab = await Session_Collab.findAll({
      where: {
        SessionId: id,
        $Voucher$: null,
      },
      include: [
        {
          model: Voucher,
          required: false,
        },
        {
          model: Proof,
          as: "fincourse",
          where: {
            status: "accepted",
          },
        },
        {
          model: Session,
          required: true,
          attributes: ["id"],
          include: {
            model: Cours,
            required: true,
            attributes: ["ProviderId"],
          },
        },
      ],
    });
    if (sess_collab.length === 0) {
      return res.send({
        status: false,
        msg: "No User Compeleted course",
      });
    }
    const v = await Voucher.findAll({
      where: {
        SessionCollabId: {
          [Op.is]: null,
        },
        SocieteId: req.societe,
        ProviderId: sess_collab[0].Session.Cour.ProviderId,
      },
    });
    if (v.length === 0) {
      return res.send({
        status: false,
        msg: "no more Vouchers",
      });
    }
    const length = Math.min(v.length, sess_collab.length);
    for (i = 0; i < length; i++) {
      v[i].SessionCollabId = sess_collab[i].id;
      await v[i].save();
    }
    return res.send({ status: true, msg: `${length} collabs got vouchers` });
  } catch (err) {
    console.log("\x1b[46m\x1b[41mERROR\x1b[0m");
    console.log(err);
    return res.send({ status: false });
  }
};
