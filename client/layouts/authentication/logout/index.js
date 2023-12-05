// react-router-dom components
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import authService from "services/auth.service";

import { useMaterialUIController, setDarkMode, setAccountType } from "context";
import axiosAuth from "services/authAxios";
import { logoutRoute } from "utils/APIRoutes";
function Logout() {
  const [controller, dispatch] = useMaterialUIController();
  const navigate = useNavigate();
  useEffect(() => {
    const logout = async () => {
      await axiosAuth.post(logoutRoute);
    };

    logout();
    setAccountType(dispatch, false);
    authService.logout();
    navigate("/login");
  }, []);

  return null;
}

export default Logout;
