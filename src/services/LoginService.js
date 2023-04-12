import axios from "axios";

export default class LoginService {
  loginUser(data) {
    return axios
      .post("http://localhost/api/admin/loginAdmin.php", {
        a_password: data.password,
        a_username: data.username,
      })
      .then((res) => res.data);
  }
}
