const db = require("../../config/database");
const { Collaborateur, Cours, Provider, Societe } = db.models;
const upload = require("./upload");
module.exports = async (req, res) => {
  if (req.err) {
    return res.send({ status: false, msg: "Not allowed Extension" });
  }
  if (!req.file) {
    return res.send({ status: false, msg: "No file sent" });
  }
  const { model, id } = req.body;
  if (model == "cours") {
    Model = Cours;
  } else if (model == "societe") {
    Model = Societe;
  } else if (model == "provider") {
    Model = Provider;
  } else if (model == "Collaborateur") {
    Model = Collaborateur;
  } else {
    return res.sendStatus(404);
  }
  if (req.admin) {
    try {
      const ret = await upload(Model, id, req.file.path, {});
      return res.send(ret);
    } catch (err) {
      return res.send({ status: false, err });
    }
  } else if (req.societe) {
    id_ = req.societe;
    filters = {};
    if (model == "Collaborateur") {
      id_ = id;
      filters = {
        where: {
          SocieteId: req.societe,
          id: id_,
        },
      };
    }
    const ret = await upload(Model, id_, req.file.path, filters);
    return res.send(ret);
  } else if (req.collab && model == "Collaborateur") {
    const ret = await upload(Model, req.collab, req.file.path, {});
    return res.send(ret);
  }
};
