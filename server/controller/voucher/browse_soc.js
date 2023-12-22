const sequelize = require("sequelize");
const db = require("../../config/database");

module.exports = async (req, res) => {
  try {
    const [vouchers, data] = await db.query(`
        SELECT  prv.*, COUNT(v.code)
        FROM "Providers" as prv
        JOIN "Vouchers" v ON  prv.id = v."ProviderId" 
        WHERE v."SocieteId"=${req.societe} and v."SessionCollabId" is NULL
        GROUP BY prv.id
      `);
    return res.send(vouchers);
  } catch {
    return res.send({ status: false });
  }
};
