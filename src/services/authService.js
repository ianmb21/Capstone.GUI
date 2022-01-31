import axios from "axios";

const API_URL = "http://20.24.121.187/api/Auth/";

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

  register(username, password, roleName) {
    return axios.post(API_URL + "register", {
      username,
      password,
      roleName,
    });
  }
}

export default new AuthService();
