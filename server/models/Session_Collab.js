const Sequelize = require("sequelize");
const { connections } = require("../socket");

const Session_Collab = (db) => {
  db.define(
    "Session_Collab",
    {
      // Model attributes are defined here
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      hooks: {
        afterUpdate: async (session_collab, options) => {
          const { CollaborateurId } = session_collab;
          const db = require("../config/database");
          const type = get_proof_type(session_collab);
          const { Notifications_object, Notifications_Entity, Collaborateur } =
            db.models;

          const recepteurCollab = await Collaborateur.findByPk(CollaborateurId);

          const adminCollab = await Collaborateur.findOne({
            where: {
              SocieteId: recepteurCollab.SocieteId,
              admin: true,
            },
          });

          const recepteurId = adminCollab.id;
          const emeteurId = recepteurCollab.id;

          let description;
          if (type === "fincourse") {
            description = "has submited a proof of course completion";
          } else if (type === "certif") {
            description = "has submited a proof of certification";
          }
          const { entity_type_id } = await Notifications_Entity.findOne({
            attributes: ["entity_type_id"],
            where: {
              description,
            },
          });

          await Notifications_object.create(
            {
              SessionCollabId: session_collab.id,
              NotificationsEntityEntityTypeId: entity_type_id,
              Notification_change: {
                emeteurId,
                recepteurId,
              },
            },
            {
              include: [
                {
                  association: Notifications_object.Notification_change,
                  include: [Notifications_object.Notification_change],
                },
              ],
            }
          );

          ws = connections.get(recepteurCollab.UserId);
          if (ws) {
            ws.send(
              JSON.stringify({
                type: "notif",
              })
            );
          }
        },
      },

      Sequelize,
      paranoid: true,
      indexes: [
        {
          unique: true,
          fields: ["id"],
        },
      ],
    }
  );
};

const get_proof_type = (session_collab) => {
  if (
    session_collab._previousDataValues.fincourseId !==
    session_collab.dataValues.fincourseId
  ) {
    return "fincourse";
  }
  if (
    session_collab._previousDataValues.certifsId !==
    session_collab.dataValues.certifsId
  ) {
    return "certif";
  }
};

module.exports = Session_Collab;
