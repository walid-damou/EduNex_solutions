const db = require("../../config/database");
const User = require("../../models/Users");
const { Provider } = db.models;
module.exports = async (req, res) => {
  var { nom } = req.body;
  if (!nom) {
    return res.sendStatus(404);
  }
  nom = nom.trim().toLowerCase();
  console.log(nom);
  const test_provider = await Provider.findOne({
    where: { nom },
  });
  if (test_provider) {
    console.log(test_provider);
    return res.send({ status: false, msg: "Provider Already Exists" });
  }
  try {
    const provider = await Provider.create({
      nom,
    });
    return res.send({
      status: true,
      msg: "Provider Added",
      id: provider.id,
    });
  } catch (err) {
    console.log(err);
    return res.send({ status: false,msg:"Error" });
  }
};
