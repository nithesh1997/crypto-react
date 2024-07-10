import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import img from "assets/logo2.png";
import { Link } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
// import { ValidationSchema } from "./Signup.validation";
import ValidationSchema from "./Signup.validation";

const SignupPage = () => {
  const { t } = useTranslation();
  const currentLanguage = useSelector((state) => state.language.currentLanguage);
  const navigate = useNavigate();
 
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(ValidationSchema())
  });

  const onSubmit = async (data) => {
    // const response = await fetch("http://localhost:5000/users", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });

    // if (response.ok) {
    //   enqueueSnackbar({
    //     variant: "success",
    //     message: "Signup successful! Please log in",
    //   });
    //   navigate("/login");
    // } else {
    //   enqueueSnackbar({
    //     variant: "error",
    //     message: "Something went wrong, Please try again later.",
    //   });
    // }

     navigate("/login");
  };

  return (
    <div>
      <h2
        className="d-flex main_color justify-content-center align-items-center w-100 "
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          fontWeight: "bolder",
          fontSize: "xx-large",
          height: "9vh",
        }}
      >
        <img style={{ marginRight: "10px" }} src={img} alt="ii" height={35} />
        {t("ribbon.brand")}
      </h2>
      <div className="d-flex justify-content-center align-items-center container-lg ">
        <Col md={5} className=" d-flex flex-column ">
          <h4 className="text-center">{t("signup.formLabels.sign_up")}</h4>
          <Form
            className="d-flex flex-column gap-3 border border-secondary rounded flex-grow-1 p-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Form.Group controlId="formBasicFName">
              <Form.Label>{t("signup.formLabels.fname")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("signup.formLabels.fname")}
                {...register("fname")}
              />
              {errors.fname && <span className="text-danger">{errors.fname.message}</span>}
            </Form.Group>
            <Form.Group controlId="formBasicLName">
              <Form.Label>{t("signup.formLabels.lname")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("signup.formLabels.lname")}
                {...register("lname")}
              />
              {errors.lname && <span className="text-danger">{errors.lname.message}</span>}
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>{t("signup.formLabels.email")}</Form.Label>
              <Form.Control
                type="email"
                placeholder={t("signup.formLabels.email")}
                {...register("email")}
              />
              {errors.email && <span className="text-danger">{errors.email.message}</span>}
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>{t("signup.formLabels.password")}</Form.Label>
              <Form.Control
                type="password"
                placeholder={t("signup.formLabels.password")}
                {...register("password")}
              />
              {errors.password && <span className="text-danger">{errors.password.message}</span>}
            </Form.Group>

            <Form.Group controlId="formBasicReenterPassword">
              <Form.Label>{t("signup.formLabels.reenterPassword")}</Form.Label>
              <Form.Control
                type="password"
                placeholder={t("signup.formLabels.reenterPassword")}
                {...register("reenterPassword")}
              />
              {errors.reenterPassword && <span className="text-danger">{errors.reenterPassword.message}</span>}
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox" className="d-flex">
              <Form.Check
                style={{ color: "blue" }}
                type="checkbox"
                {...register("agreeTerms")}
              />
              <Form.Label>
                <Link style={{ marginLeft: "5px" }}>
                  {t("signup.formLabels.agreeTerms")}
                </Link>
              </Form.Label>
            </Form.Group>
            {errors.agreeTerms && <span className="text-danger">{errors.agreeTerms.message}</span>}

            <Button type="submit" className="mt-auto signupBtn">
              {t("signup.buttons.signup")}
            </Button>
          </Form>
          {/* <Form.Label>
            <Link style={{ marginLeft: "5px" }} onClick={() => navigate("/login")}>
              {t("signup.formLabels.alreadyHaveAccount")}
            </Link>
          </Form.Label> */}
           <div>
            Do Have an Account ?{" "}
            <Link className="" to="/login">
              {" "}
              LogIn
            </Link>
          </div>
        </Col>
      </div>
    </div>
  );
};

export default SignupPage;
