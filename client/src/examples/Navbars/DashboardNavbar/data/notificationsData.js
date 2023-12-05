import Icon from "@mui/material/Icon";

import { useEffect, useRef, useState } from "react";

import axios from "services/authAxios";

import {
  getNotifsCollabRoute,
  getNotifsSocRoute,
  marknoptifReadRoute,
} from "utils/APIRoutes";

import { setUpdater, useMaterialUIController, setChangedNotif } from "context";

const generate_notif = (data, entity, description, emetteur, notifId) => {
  switch (entity) {
    case "Request":
      if (data.Request !== null) {
        const cours = data.Request.Cour.nom;
        const notif_component = {
          id: notifId,
          icon: <Icon>warning</Icon>,
          route: "/requests",
          label: description,
          transmitter: emetteur,
          subject: cours,
        };
        return notif_component;
      }
      return {
        id: notifId,

        icon: <Icon>warning</Icon>,
        route: "/requests",
        label: description,
        transmitter: emetteur,
        subject: "",
      };
    case "Proof":
      if (data.Session_Collab !== null) {
        const { nom, id } = data.Session_Collab.Session;
        const notif_component = {
          notifId,
          icon: <Icon>warning</Icon>,
          route: `/sessions/details/${id}`,
          label: description,
          transmitter: emetteur,
          subject: nom,
        };
        return notif_component;
      }
      return {
        id: notifId,
        icon: <Icon>warning</Icon>,
        route: "/requests",
        label: description,
        transmitter: emetteur,
        subject: "",
      };

    default:
      return {
        id: notifId,
        icon: <Icon>warning</Icon>,
        route: "/dashboard",
        label: description,
        transmitter: emetteur,
        subject: "",
      };
  }
};

export const markRead = async (notifId) => {
  await axios.post(marknoptifReadRoute, { notifId });
};

export default function Data() {
  const [controller, dispatch] = useMaterialUIController();
  const { accountType, userId, updater } = controller;

  const [notifs, setNotifs] = useState(null);

  // Get initial Notifs no ws
  useEffect(() => {
    const getNotifs = async () => {
      let route;
      if (accountType === "Societe") {
        route = getNotifsSocRoute;
      } else if (accountType === "Collab") {
        route = getNotifsCollabRoute;
      }
      const { data } = await axios.post(route);
      setNotifs(data);
      setChangedNotif(dispatch, data.length);
    };
    getNotifs();
   setUpdater(dispatch,!updater);
  }, []);

  const socket = useRef();

  useEffect(() => {

    const socket_ = new WebSocket("ws://127.0.0.1:8888/ws");

    socket_.onopen = function (e) {
      socket_.send(
        JSON.stringify({
          type: "join",
          username: userId,
        })
      );
    };
    socket_.addEventListener("message", async (event) => {
      console.log("Message from server ", event.data);
      const data = JSON.parse(event.data);
      if (data.type === "notif") {
        let route;
        if (accountType === "Societe") {
          route = getNotifsSocRoute;
        } else if (accountType === "Collab") {
          route = getNotifsCollabRoute;
        }
        const { data } = await axios.post(route);
        setNotifs(data);
        setChangedNotif(dispatch, data.length);
        setUpdater(dispatch, !updater);
      }
    }
    )
  }, [socket]);


  const notificationsData = [];
  if (Array.isArray(notifs) && notifs.length > 0) {
    notifs.map((notif) => {
      const { nom, prenom } = notif.Notification_change.emetteur;
      const { description, entity } = notif.Notifications_Entity;
      const notif_content = generate_notif(
        notif,
        entity,
        description,
        `${nom} ${prenom}`,
        notif.id
      );
      notificationsData.push(notif_content);
    });
  }

  return notificationsData;
}
