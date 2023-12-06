import { setAccessToken } from "utils/accessToken";
import { loginRoute } from "utils/APIRoutes";
import axios from "./authAxios";
const login = (username, password, captcha) => {
  return axios
    .post(loginRoute, {
      username,
      password,
      captcha,
    })
    .then(async (response) => {
      if (response.data.accesstoken) {
        setAccessToken(response.data.accesstoken);
        // setAccessToken(response.data.type);
      }

      return response.data;
    });
};

const logout = () => {
  setAccessToken("");
};

const authService = {
  login,
  logout,
};

export default authService;
