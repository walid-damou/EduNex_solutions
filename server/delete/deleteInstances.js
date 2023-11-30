const db = require("../../config/database");
const {
  Departement,
  Request,
  Societe,
  Provider,
  Cours,
  Collaborateur,
  Session,
  Voucher,
} = db.models;
module.exports = async (req, res) => {
  const { model, id } = req.body;
  var filters = { where: { id } };
  if (model == "cours") {
    Model = Cours;
  } else if (model == "societe") {
    Model = Societe;
  } else if (model == "provider") {
    Model = Provider;
  } else if (model == "Collaborateur") {
    filters.where.SocieteId = req.societe;
    Model = Collaborateur;
  } else if (model == "Request") {
    Model = Request;
  } else if (model == "Session") {
    filters.where.SocieteId = req.societe;
    Model = Session;
  } else if (model == "Departement") {
    filters.where.SocieteId = req.societe;
    Model = Departement;
  } else if (model == "Voucher") {
    Model = Voucher;
  } else {
    return res.sendStatus(404);
  }
  // const associations = Model.associations;
  if (req.admin) {
    filters = { where: { id } };
  }
  try {
    // Object.keys(associations).forEach((key) => {
    //   if (associations[key].options.onDelete === "CASCADE") {
    //     // associations[key].destroy(wher)
    //     console.log(associations[key].options);
    //   }
    // });

    await Model.destroy(filters);

    return res.send({ status: true, msg: "deleted" });
  } catch (err) {
    console.log(err);
    return res.send({ status: false, err });
  }
};
