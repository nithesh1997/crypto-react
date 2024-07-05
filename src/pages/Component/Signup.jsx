import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Card, NavLink } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
// import i18n from "../../Helper/i18next";
import img from "../../photos/logo2.png";
import { Link } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

const SignupPage = () => {
  const { t } = useTranslation();
  const currentLanguage = useSelector((state) => state.currentLanguage);
  const [isChecked, setIsChecked] = useState(false);
  // useEffect(() => {
  //   i18n.changeLanguage(currentLanguage);
  // }, []);

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    reenterPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handlePlanSelect = (plan) => {
    setFormData({
      ...formData,
      selectedPlan: plan,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allValuesPresent = Object.keys(formData)
      .filter((key) => key !== "agreeTerms")
      .map((key) => formData[key])
      .every(
        (value) => (
          console.log(value, "value"),
          value !== null && value !== undefined && value !== ""
        )
      );
    if (!allValuesPresent) {
      enqueueSnackbar({
        variant: "error",
        message: "Please fill all field",
      });
      return;
    }

    if (!formData.agreeTerms) {
      enqueueSnackbar({
        variant: "error",
        message:
          "Please indicate that you have read and agree to the Terms and Conditions",
      });
      return;
    }

    if (formData.password !== formData.reenterPassword) {
      enqueueSnackbar({
        variant: "error",
        message: "Passwords do not match",
      });
      return;
    }

    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      enqueueSnackbar({
        variant: "success",
        message: "Signup successful! Please log in",
      });
      setFormData({});
      navigate("/login");
    } else {
      enqueueSnackbar({
        variant: "error",
        message: "Something went wrong, Please try again later.",
      });
    }
  };

  return (
    <div>
      {" "}
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
          <Form className="d-flex flex-column gap-3 border border-secondary rounded flex-grow-1 p-4">
            <Form.Group controlId="formBasicFName">
              <Form.Label>{t("signup.formLabels.fname")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("signup.formLabels.fname")}
                name="fname"
                value={formData.fname}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicLName">
              <Form.Label>{t("signup.formLabels.lname")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("signup.formLabels.lname")}
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>{t("signup.formLabels.email")}</Form.Label>
              <Form.Control
                type="email"
                placeholder={t("signup.formLabels.email")}
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>{t("signup.formLabels.password")}</Form.Label>
              <Form.Control
                type="password"
                placeholder={t("signup.formLabels.password")}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicReenterPassword">
              <Form.Label>{t("signup.formLabels.reenterPassword")}</Form.Label>
              <Form.Control
                type="password"
                placeholder={t("signup.formLabels.reenterPassword")}
                name="reenterPassword"
                value={formData.reenterPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox" className="d-flex">
              <Form.Check
                style={{ color: "blue" }}
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
              />
              <Form.Label>
                <Link style={{ marginLeft: "5px" }}>
                  {"I agree to the terms and conditions"}
                </Link>
              </Form.Label>
            </Form.Group>

            <Button
              type="button"
              className="mt-auto signupBtn"
              onClick={(e) => handleSubmit(e)}
            >
              {t("signup.buttons.signup")}
            </Button>
          </Form>
        </Col>
      </div>
    </div>
  );
};

export default SignupPage;
