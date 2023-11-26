const Sequelize = require("sequelize");
const { connections } = require("../socket");
const Request = (db) => {
  db.define(
    "Request",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "pending",
        validate: {
          inside: (value) => {
            const enums = ["accepted", "pending", "refused"];
            if (!enums.includes(value)) {
              throw new Error("not a valid option");
            }
          },
        },
      },
    },
    {
      hooks: {
        afterCreate: async (request, options) => {
          const { CollaborateurId } = request;
          const db = require("../config/database");
          const { Notifications_object, Notifications_Entity, Collaborateur } =
            db.models;
          const { entity_type_id } = await Notifications_Entity.findOne({
            attributes: ["entity_type_id"],
            where: {
              description: "sent a request to enroll to",
            },
          });

          const { SocieteId } = await Collaborateur.findByPk(CollaborateurId);
          const admin = await Collaborateur.findOne({
            where: {
              SocieteId,
              admin: true,
            },
          });

          await Notifications_object.create(
            {
              RequestId: request.id,
              NotificationsEntityEntityTypeId: entity_type_id,
              Notification_change: {
                emeteurId: CollaborateurId,
                recepteurId: admin.id,
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

          const id = admin.UserId;

          ws = connections.get(id);
          if (ws) {
            ws.send(
              JSON.stringify({
                type: "notif",
              })
            );
          }
          
        },
        afterUpdate: async (request, options) => {
          const { status } = request;
          const { CollaborateurId } = request;
          const db = require("../config/database");
          const {
            Notifications_object,
            Notifications_Entity,
            Collaborateur,
            User,
          } = db.models;

          const recepteurCollab = await Collaborateur.findByPk(CollaborateurId);
          const adminCollab = await Collaborateur.findOne({
            where: {
              SocieteId: recepteurCollab.SocieteId,
              admin: true,
            },
          });

          const emeteurId = adminCollab.id;
          const recepteurId = recepteurCollab.id;

          let description;
          if (status == "accepted") {
            description = "has accepted your request to enroll";
          } else if (status == "refused") {
            description = "has rejected your request to enroll";
          }
          const { entity_type_id } = await Notifications_Entity.findOne({
            attributes: ["entity_type_id"],
            where: {
              description,
            },
          });

          await Notifications_object.create(
            {
              RequestId: request.id,
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
          //io.emit("notif");
          //const {id}=await User.findByPk(recepteurId);

          ws = connections.get(recepteurCollab.UserId);
          console.log("ws=", recepteurCollab.UserId);
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
      deletedAt: "deletedAt",
    }
  );
};
module.exports = Request;
