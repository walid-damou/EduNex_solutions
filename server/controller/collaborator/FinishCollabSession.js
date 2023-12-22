const db = require("../../config/database");
const { Session_Collab } = db.models;
module.exports = async (req, res) => {
  const { session, collab } = req.body;
  if (!session || !collab) {
    return res.sendStatus(403);
  }
  try {
    row = await Session_Collab.findOne({
      where: { SessionId: session, CollaborateurId: collab },
    });
    row.status = 1;
    row.save();
    return res.send({ status: true, msg: "Good" });
  } catch (err) {
    return res.send({ status: false });
  }
};
