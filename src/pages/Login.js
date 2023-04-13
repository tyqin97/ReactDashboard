import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";

import LoginService from "../services/LoginService";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const [blocked, setBlocked] = useState(false);
  const nav = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (data) => {
      setBlocked(true);
      if (!data.password || !data.username) {
        setBlocked(false);
        toast.error("Username and password must not be empty.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } else {
        const loginService = new LoginService();
        loginService.loginUser(data).then((res) => {
          if (res.status) {
            localStorage.setItem("isAuthenticated", true);
            localStorage.setItem("dash-token", res.token);
            localStorage.setItem("username", data.username);

            toast.success(`${res.message} Welcome back, ${data.username}`, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000,
              onClose: () => {
                nav("/dashboard");
              },
            });
          } else {
            setBlocked(false);
            toast.error(res.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000,
            });
          }
        });
        return;
      }
    },
  });

  return (
    <div className="login-body">
      <div className="card login-panel p-fluid my-auto">
        <div className="login-panel-content ">
          <div className="grid">
            <div className="col-12 logo-container">
              <span className="guest-sign-in">
                Welcome to AI Dashboard.
                <br />
                Please sign in to continue.
              </span>
            </div>
            <form onSubmit={formik.handleSubmit} className="col-12">
              <div className="col-12 username-container">
                <label>Username</label>
                <div className="login-input">
                  <InputText
                    id="username"
                    name="username"
                    value={formik.values.username}
                    type="text"
                    disabled={blocked}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
              <div className="col-12 password-container">
                <label>Password</label>
                <div className="login-input">
                  <InputText
                    id="password"
                    name="password"
                    value={formik.values.password}
                    type="password"
                    disabled={blocked}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
              <div className="flex">
                <div className="col-6 rememberme-container">
                  <Checkbox
                    // checked={checked}
                    // onChange={(e) => setChecked(e.checked)}
                    disabled={blocked}
                  />
                  <label> Remember me</label>
                </div>

                <div className="col-6 forgetpassword-container">
                  <a href="/" className="forget-password">
                    Forget Password
                  </a>
                </div>
              </div>
              <div className="col-12 sm:col-8 md:col-8 mx-auto">
                <Button type="submit" label="Sign In" loading={blocked} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
