const db = require("../../config/database");
const { Cours } = db.models;

module.exports = async (req, res) => {
  cours = req.body["nom"];
  provider = req.body["provider"];
  description = req.body["description"];
  if (!cours || !provider || !description) {
    return res.sendStatus(403);
  }
  try {
    const coursObj = await Cours.create({
      nom: cours,
      ProviderId: provider,
      description: description,
    });
    return res.json({
      status: true,
      msg: "Course added",
      id: coursObj.id,
    });
  } catch (err) {
    return res.send({ status: "error" });
  }
};