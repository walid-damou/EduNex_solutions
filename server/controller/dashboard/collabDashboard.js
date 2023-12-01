const sequelize = require("../../config/database");

const { Request, Proof, Session_Collab, Voucher } = sequelize.models;
module.exports = async (req, res) => {
  console.log(Request);
  try {
    const requests = await Request.count({
      where: {
        CollaborateurId: req.collab,
        status: "pending",
      },
    });

    const certifs = await Session_Collab.count({
      include: {
        model: Proof,
        as: "certifs",
        where: {
          status: "accepted",
        },
      },
      where: {
        CollaborateurId: req.collab,
      },
    });

    const sessions = await Session_Collab.count({
      where: {
        CollaborateurId: req.collab,
      },
    });

    const vouchers = await Voucher.count({
      include: {
        required: true,
        model: Session_Collab,
        where: {
          CollaborateurId: req.collab,
        },
      },
    });
    return res.send({ status: true, vouchers, sessions, certifs, requests });
  } catch (err) {
    console.log(err);
    return res.send({ status: false });
  }
};
