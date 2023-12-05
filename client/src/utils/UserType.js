import { getType } from "utils/APIRoutes";
import axios from "services/authAxios";

import { useState, useEffect } from "react";

const UserGiver = () => {
  try {
    const userType = JSON.parse(localStorage.getItem("user")).type;
    return { userType };
  } catch (err) {
    return { userType: false };
  }
};

export default UserGiver;
