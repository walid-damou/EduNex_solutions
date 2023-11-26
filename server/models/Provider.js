const Sequelize = require("sequelize");
const io = require("../socket").get();

const Provider = (db) => {
  db.define(
    "Provider",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nom: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
    },
    {
      hooks: {
        afterCreate: async (provider, options) => {
          const db = require("../config/database");
          const {
            Notification_change,
            Notifications_object,
            Notifications_Entity,
          } = db.models;
          const { entity_type_id } = await Notifications_Entity.findOne({
            attributes: ["entity_type_id"],
            where: {
              description: "Provider added",
            },
          });

          const notif = await Notifications_object.create(
            {
              ProviderId: provider.id,
              NotificationsEntityEntityTypeId: entity_type_id,
              Notification_change: {
                actorId: 1,
                SocieteId: 1,
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
          io.emit("notif");
        },
      },
      Sequelize,
      paranoid: true,
      deletedAt: "deletedAt",
    }
  );
};
module.exports = Provider;
