import React, { useRef, useState } from "react";

import { useFormik } from "formik";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Checkbox } from "primereact/checkbox";

import LoginService from "../services/LoginService";

export const Login = () => {
  const [blocked, setBlocked] = useState(false);
  const toast = useRef(null);

  const loginSuccessToast = () => {
    toast.current.show({
      severity: "success",
      summary: "Login Successful",
      life: 3000,
    });
  };

  const loginFailedToast = () => {
    toast.current.show({
      severity: "error",
      summary: "Invalid Credential",
      life: 3000,
    });
  };

  const invalidCredToast = (msg) => {
    toast.current.show({
      severity: "error",
      summary: msg,
      life: 3000,
    });
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (data) => {
      setBlocked(true);
      if (!data.password || !data.username) {
        invalidCredToast("Username and Password must not be empty!");
        setBlocked(false);
      } else {
        const loginService = new LoginService();
        loginService.loginUser(data).then((res) => {
          console.log(res.status);
          if (!res.status) {
            loginFailedToast();
            setBlocked(false);
          } else {
            loginSuccessToast();
            setBlocked(false);
            window.location.href = "/dashboard";
          }
        });
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
                    onChange={(e) => {
                      formik.setFieldValue("username", e.target.value);
                    }}
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
                    onChange={(e) => {
                      formik.setFieldValue("password", e.target.value);
                    }}
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
                <Button type="submit" label="Sign In" disabled={blocked} />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toast ref={toast} />
    </div>
  );
};
