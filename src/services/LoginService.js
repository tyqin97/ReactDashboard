import axios from "axios";

export default class LoginService {
  loginUser(data) {
    return axios
      .post("http://localhost:3010/user/login", {
        password: data.password,
        username: data.username,
      })
      .then((res) => res.data);
  }
}
