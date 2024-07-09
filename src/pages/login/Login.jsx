import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
// import i18n from "../../Helper/i18next";
// import img from "../../assets/logo2.png";
import img from "src/assets/logo2.png";
// import { validateUser } from "../../utils/auth";
import { validateUser } from "utils/auth";
// import { setauth } from "../../store/languageSlice";
import { setauth } from "store/languageSlice";
import { enqueueSnackbar } from "notistack";

const LoginForm = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const currentLanguage = useSelector((state) => state.currentLanguage);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidUser = await validateUser(email, password);
    if (isValidUser) {
      enqueueSnackbar({
        variant: "success",
        message: "Login successful",
      });
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("email", email);
      dispatch(setauth(true));
      navigate("/");
    } else {
      enqueueSnackbar({
        variant: "error",
        message: "Invalid email or password",
      });
    }
  };
  // useEffect(() => {
  //   i18n.changeLanguage(currentLanguage);
  // }, []);

  return (
    <div className="login_container">
      <Form onSubmit={handleSubmit} className="container_main_login p-1 ">
        <div
          className="w-100"
          style={{ left: "0", top: "0%", borderBottom: "1px solid black" }}
        >
          <h2
            className="d-flex main_color  justify-content-center align-items-center "
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
              fontWeight: "bolder",
              height: "9vh",
            }}
          >
            <img
              style={{ marginRight: "10px" }}
              src={img}
              alt="ii"
              height={35}
            />
            {t("ribbon.brand")}
          </h2>
        </div>

        <div className="h-auto p-5  login_form d-flex flex-column justify-content-between gap-3">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>{t("loginpage.emailaddres")}</Form.Label>
            <Form.Control
              type="email"
              placeholder={t("loginpage.enteremail")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>{t("loginpage.pass")}</Form.Label>
            <Form.Control
              type="password"
              placeholder={t("loginpage.enpass")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Link className="forget_pass"> {t("loginpage.forpass")}</Link>
          <Button
            type="submit"
            style={{ backgroundColor: "darkgray" }}
            className="border-0"
          >
            {t("loginpage.login")}
          </Button>
          <div>
            {t("loginpage.dhaa")}{" "}
            <Link className="forget_pass" to="/signup">
              {" "}
              {t("loginpage.creacc")}
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
