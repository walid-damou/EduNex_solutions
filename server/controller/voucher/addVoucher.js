const db = require("../../config/database");
const CreateReport = require("../other/CreateReport");
const { Voucher, Societe, Provider } = db.models;
module.exports = async (req, res) => {
  const { vouchers } = req.body;
  if (!vouchers) {
    return res.sendStatus(403);
  }
  errors = [];
  index = 1;
  for (let voucher of vouchers) {
    var { societe, code, provider } = voucher;

    if (!societe || !code || !provider) {
      errors.push({ row: `${index + 1}`, error: "empty row" });
      index++;
      continue;
    }
    societe = societe.trim().toLowerCase();
    provider = provider.trim().toLowerCase();
    try {
      const prov = await Provider.findOne({
        where: { nom: provider },
      });

      const soc = await Societe.findOne({
        where: { name: societe },
      });

      if (prov && soc) {
        await Voucher.create({
          SocieteId: soc.id,
          code: code,
          ProviderId: prov.id,
        });
      } else {
        errors.push({
          row: `${index + 1}`,
          error: "Provider or Societe Incorrect",
        });
        index++;
        continue;
      }
      index++;
    } catch (err) {
      errors.push({ row: `${index + 1}`, error: err });
      index++;
    }
  }
  var report = null;
  // console.log("errors", errors);
  if (errors.length > 0) {
    report = await CreateReport(errors);
  }
  return res.send({
    status: errors.length == 0 ? true : false,
    msg: errors.length == 0 ? "Vouchers Created Successfully " : "Error check ",
    report: report ? report : null,
  });
};
