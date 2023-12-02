module.exports = (req, res, next) => {
  if (req.admin) {
    return next();
  } else if (req.collab) {
    return res.send({ status: false, msg: "You can't delete this" });
  } else if (req.societe) {
    const { model, id } = req.body;
    switch (model) {
      case "Societe":
        return res.send({ status: false, msg: "You can't delete this" });
        break;
      case "provider":
        return res.send({ status: false, msg: "You can't delete this" });
        break;
      case "Request":
        return res.send({ status: false, msg: "You can't delete this" });
        break;
      case "Voucher":
        return res.send({ status: false, msg: "You can't delete this" });
        break;

      default:
        return next();
        break;
    }
  }
};
