const argon2 = require("argon2");
const db = require("../../config/database");
const { Collaborateur, Societe, User } = db.models;


module.exports = async (req, res) => {
  // try {
  const { collabs } = req.body;

  const pep = process.env.PEPPER;
  if (!collabs) return res.sendStatus(403);

  // const societeCheck = await Societe.findOne({ where: { name: societe } });
  // if (societeCheck)
  //   return res.json({ status: false, msg: "societe already used" });
  // const usernameCheck = await User.findOne({ where: { username } });
  // if (usernameCheck)
  //   return res.json({ status: false, msg: "Username already used" });
  // const emailCheck = await Collaborateur.findOne({ where: { email } });
  // if (usernameCheck)
  //   return res.json({ status: false, msg: "Username already used" });

  const DATA = [];
  collabs.map(async (collab) => {
    const { username, nom, prenom, email, password } = collab;

    const hash = await argon2.hash(password + pep);
    const user = await User.create(
      {
        username,
        password: hash,
        Collaborateur: {
          nom,
          prenom,
          email,
          SocieteId: req.societe,
          admin: false,
          instructor: false,
        },
      },
      {
        include: [
          {
            association: User.Collaborateur,
            include: [Collaborateur.Societe],
          },
        ],
      }
    );
  });

  return res.send({
    status: true,
    msg: "Users Created Successfully",
    // id: user.id,
  });
  // } catch (err) {
  //   return res.send({ msg: "error " + err });
  // }
};
