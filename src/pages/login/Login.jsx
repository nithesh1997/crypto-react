import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginValidationSchema from "./Login.validation";
import img from "src/assets/logo2.png";
import { setauth } from "src/store/dataSlice"; 
import { enqueueSnackbar } from "notistack";
import whoAmI from "src/utils/whoAmI";
import { setUser } from "src/store/userSlice";

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state) => state.language.currentLanguage);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(LoginValidationSchema()),
  });

  const onSubmit = async (data) => {
    // Handle form submission logic here
    const { email, password } = data;
    const userToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsIlVzZXJEZXRhaWxzIjp7ImlkIjoxLCJ1c2VybmFtZSI6Im1pY2hlYWwiLCJkaXNwbGF5bmFtZSI6Ik1pY2hlYWwgU2NvdHQiLCJlbWFpbCI6Im1pY2hlYWwuc2NvdHRAZHVuZGVybXVmZmxpbi5jb20iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9XSwiYWNjb3VudE5vbkxvY2tlZCI6dHJ1ZSwiYWNjb3VudE5vbkV4cGlyZWQiOnRydWUsImNyZWRlbnRpYWxzTm9uRXhwaXJlZCI6dHJ1ZSwiZW5hYmxlZCI6dHJ1ZX0sImlhdCI6MTY4Nzk2NzM2MCwiZXhwIjoxNjg3OTc0NTYwfQ.vXA_VaGPVvlgxMvpLYeyWQKUHeF4EFFJQWFKz4OpY72LEl9qGQaPeUEdgve7CTUs9-ABTq56hAGK8RNedvNAuA";

    const newUserState = await whoAmI(userToken);
    sessionStorage.setItem(
      "profile-preferences",
      JSON.stringify({
        ...newUserState,
        tokenType: "Bearer",
        accessToken: userToken,
      }),
    );

    dispatch(setUser({
        ...newUserState,
        tokenType: "Bearer",
        accessToken: userToken,
      }));

    enqueueSnackbar({
      variant: "success",
      message: "Login successful",
    });

    setTimeout(() => {
      navigate("/");
    }, 400);
  };

  return (
    <div className="login_container">
      <Form onSubmit={handleSubmit(onSubmit)} className="container_main_login p-1">
        {/* Form Header */}
        <div className="w-100" style={{ left: "0", top: "0%", borderBottom: "1px solid black" }}>
          <h2 className="d-flex main_color justify-content-center align-items-center"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
              fontWeight: "bolder",
              height: "9vh",
            }}>
            <img style={{ marginRight: "10px" }} src={img} alt="ii" height={35} />
            {t("ribbon.brand")}
          </h2>
        </div>

        {/* Form Body */}
        <div className="h-auto p-5 login_form d-flex flex-column justify-content-between gap-3">
          {/* Email Field */}
          <Form.Group controlId="formBasicEmail">
            <Form.Label>{t("loginpage.emailaddres")}</Form.Label>
            <Form.Control
              type="email"
              placeholder={t("loginpage.enteremail")}
              {...register("email")}
            />
            {errors.email && <p className="error-message text-danger">{errors.email.message}</p>}
          </Form.Group>

          {/* Password Field */}
          <Form.Group controlId="formBasicPassword">
            <Form.Label>{t("loginpage.pass")}</Form.Label>
            <Form.Control
              type="password"
              placeholder={t("loginpage.enpass")}
              {...register("password")}
            />
            {errors.password && <p className="error-message text-danger">{errors.password.message}</p>}
          </Form.Group>

          {/* Forgot Password Link */}
          <Link className="forget_pass">{t("loginpage.forpass")}</Link>

          {/* Login Button */}
          <Button type="submit" style={{ backgroundColor: "darkgray" }} className="border-0">
            {t("loginpage.login")}
          </Button>

          {/* Create Account Link */}
          <div>
            {t("loginpage.dhaa")}{" "}
            <Link className="forget_pass" to="/signup">
              {t("loginpage.creacc")}
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
