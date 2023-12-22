const { Op } = require("sequelize");
const db = require("../../config/database");

const { Session_Collab, Voucher, Proof, Session, Cours } = db.models;

module.exports = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.sendStatus(403);
  }
  try {
    console.log("\x1b[46mLOG\x1b[0m");
    const sess_collab = await Session_Collab.findOne({
      where: {
        id: id,
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
    if (!sess_collab) {
      return res.send({
        status: false,
        msg: "User doesn't exist or has already a Voucher or didn't complete this course",
      });
    }
    console.log("\x1b[46mLOG\x1b[0m");
    console.log(sess_collab);
    const v = await Voucher.findOne({
      where: {
        SessionCollabId: {
          [Op.is]: null,
        },
        SocieteId: req.societe,
        ProviderId: sess_collab.Session.Cour.ProviderId,
      },
    });
    if (!v) {
      return res.send({
        status: false,
        msg: "No more Vouchers",
      });
    }
    v.SessionCollabId = sess_collab.id;
    await v.save();
    return res.send({ status: true, msg: "Done" });
  } catch (err) {
    console.log("\x1b[46m\x1b[41mERROR\x1b[0m");
    console.log(err);
    return res.send({ status: false });
  }
};
