module.exports = (db) => {
  // Session Collab
  const {
    Voucher,
    Request,
    ChallengeCollab,
    Session,
    Session_Collab,
    Collaborateur,
    Societe,
    Departement,
    Quota,
    Provider,
    User,
    Challenge,
    Cours,
    SuperAdmin,
    Proof,
    Notifications_Entity,
    Notifications_object,
    Notification_change,
  } = db.models;

  //notif_chang - user
  Notification_change.belongsTo(Collaborateur, {
    as: "emetteur",
    foreignKey: {
      name: "emeteurId",
    },
    onDelete: "CASCADE",
  });
  Notification_change.belongsTo(Collaborateur, {
    as: "recepteur",
    foreignKey: {
      name: "recepteurId",
    },
    onDelete: "CASCADE",
  });

  //notif_chang - notif_Obj
  Notification_change.hasOne(Notifications_object);
  Notifications_object.Notification_change =
    Notifications_object.belongsTo(Notification_change);

  //notif_ent - notif_Obj

  Notifications_Entity.hasOne(Notifications_object);
  Notifications_object.belongsTo(Notifications_Entity);

  Notifications_object.belongsTo(Session_Collab);
  Notifications_object.belongsTo(Voucher);
  Notifications_object.belongsTo(Request);
  Notifications_object.belongsTo(Session);
  Notifications_object.belongsTo(Provider);

  // Voucher Session_Collab
  Voucher.belongsTo(Session_Collab);
  Session_Collab.hasOne(Voucher);
  // Voucher Provider
  Voucher.belongsTo(Provider);
  Provider.hasMany(Voucher);
  // Voucher Societe
  Voucher.belongsTo(Societe);
  Societe.hasMany(Voucher);
  // Session Collabs
  Session.belongsToMany(Collaborateur, {
    through: Session_Collab,
  });
  Collaborateur.belongsToMany(Session, {
    through: Session_Collab,
  });
  // Session.hasMany(Session_Collab);
  // Session_Collab.belongsTo(Session);
  // Collaborateur.hasMany(Session_Collab);
  // S
  Session.hasMany(Session_Collab);
  Session_Collab.belongsTo(Session);
  Collaborateur.hasMany(Session_Collab);
  Session_Collab.belongsTo(Collaborateur);
  // Session_Collab Proof
  Proof.hasMany(Session_Collab);
  Session_Collab.belongsTo(Proof, { as: "certifs" });
  Proof.hasOne(Session_Collab);
  Session_Collab.belongsTo(Proof, { as: "fincourse" });
  // Departement Collab
  Departement.hasMany(Collaborateur);
  Collaborateur.belongsTo(Departement);
  // Societe Departement
  Societe.hasMany(Departement, {
    onDelete: "CASCADE",
  });
  // Departement.belongsTo(Societe);
  // Societe.hasMany(Collaborateur, {
  //   onDelete: "CASCADE",
  Departement.belongsTo(Societe);
  //Societe Collab
  Societe.hasMany(Collaborateur, {
    onDelete: "CASCADE",
  });
  Collaborateur.Societe = Collaborateur.belongsTo(Societe);
  // Societe Quota
  Societe.hasMany(Quota);
  Quota.belongsTo(Societe);
  // User Collab
  User.Collaborateur = User.hasOne(Collaborateur, {
    onDelete: "CASCADE",
  });
  Collaborateur.belongsTo(User);
  // Challenge Societe
  Challenge.belongsTo(Societe);
  Societe.hasMany(Challenge);
  // Challenge Collab
  Challenge.belongsToMany(Collaborateur, { through: ChallengeCollab });
  Collaborateur.belongsToMany(Challenge, { through: ChallengeCollab });
  // Challenge Session
  Challenge.belongsToMany(Session, { through: "ChallengeSession" });
  Session.belongsToMany(Challenge, { through: "ChallengeSession" });
  //Challenge Departement
  Challenge.belongsToMany(Departement, { through: "Challenge_Dept" });
  Departement.belongsToMany(Challenge, { through: "Challenge_Dept" });
  // Provider Cours
  Provider.Cours = Provider.hasMany(Cours, {
    onDelete: "CASCADE",
  });
  Cours.Provider = Cours.belongsTo(Provider);
  // Cours Quota
  Provider.hasMany(Quota, {
    onDelete: "CASCADE",
  });
  Quota.belongsTo(Provider);
  // Session Cours
  Session.belongsTo(Cours);
  Cours.hasMany(Session, {
    onDelete: "CASCADE",
  });
  // Session Societe
  Session.belongsTo(Societe);
  Societe.hasMany(Session, {
    onDelete: "CASCADE",
  });
  // SuperAdmin User
  SuperAdmin.User = SuperAdmin.belongsTo(User);
  User.SuperAdmin = User.hasOne(SuperAdmin);
  // Requests
  Collaborateur.belongsToMany(Cours, {
    through: {
      model: Request,
      unique: false,
    },

    /*
    // SuperAdmin User
      SuperAdmin.User = SuperAdmin.belodngsTo(User);
      User.SuperAdmin = User.hasOne(SuperAdmin);
      // Requests
      Collaborateur.belongsTsoMany(Cours, {
        through: {
          model: Request,
          unique: true,
        },
    */
  });
  Cours.belongsToMany(Collaborateur, {
    through: {
      model: Request,
      unique: false,
    },
  });
  Collaborateur.hasMany(Request, {
    onDelete: "CASCADE",
  });
  Request.belongsTo(Collaborateur);
  Cours.hasMany(Request, {
    onDelete: "CASCADE",
  });
  Request.belongsTo(Cours);
};
