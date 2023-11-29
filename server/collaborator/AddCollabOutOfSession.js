const { fn, where, col, Op, literal } = require("sequelize");
const db = require("../../config/database");
const { Session, Collaborateur } = db.models;
module.exports = async (req, res) => {
  const { sess } = req.body;
  if (!sess) {
    return res.sendStatus(403);
  }
  try {
    const collabs = await Collaborateur.findAll({
      include: {
        model: Session,
        required: false,
        through: {
          attributes: [],
        },
        attributes: [],
        where: {
          id: {
            [Op.eq]: sess,
          },
        },
      },
      attributes: ["nom", "prenom", "id"],
      where: {
        $Sessions$: null,
        admin: false,
        instructor: false,
        SocieteId: req.societe,
      },
      // having: [{ session_count: { [Op.eq]: 0 } }],
      // having: where(fn("count", col("Sessions.id")), Op.eq, 0),
      // group: ["Collaborateur.id"],
    });
    return res.send({
      status: true,
      collabs,
    });
  } catch (err) {
    return res.send({ status: false });
  }
};
