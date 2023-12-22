const sequelize = require("sequelize");
const db = require("../../config/database");

module.exports = async (req, res) => {
  try {
    const [vouchers, data] = await db.query(`
        SELECT  prv.nom, prv.image, v.code, s.nom as "session_name", c.nom as "cours_nom"
        FROM "Vouchers" as v
        JOIN "Providers" prv ON  prv.id = v."ProviderId"
        JOIN "Session_Collabs" sc ON v."SessionCollabId" = sc.id
        JOIN "Sessions" s ON s.id = sc."SessionId"
        JOIN "Cours" c ON c.id = s."CourId"
        WHERE v."SessionCollabId" in(
            SELECT  id
            FROM "Session_Collabs" as sc
            WHERE "CollaborateurId"=${req.collab}
        )
      `);

    return res.send(vouchers);
  } catch (err) {
    console.error(err);
    return res.send({ status: false });
  }
};

