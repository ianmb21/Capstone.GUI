import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/Auth/`;

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login", { username, password })
      .then((response) => {
        if (response.data.jwtToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    return axios
      .post(API_URL + "logout")
      .then(() => {
        localStorage.removeItem("user");
      });
  }

  register(username, password, roleName, nationalId) {
    return axios.post(API_URL + "register", {
      username,
      password,
      roleName,
      nationalId,
    });
  }
}

export default new AuthService();
