import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import React, { Component, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import img from "../../photos/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import { setLanguage, setauth } from "../../languageSlice";
import { useDispatch, useSelector } from "react-redux";
// import i18n from "../../Helper/i18next";
import { enqueueSnackbar } from "notistack";

function Header2() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state) => state.currentLanguage);
  const isLoggedIn = useSelector((state) => state.auth);
  const [selectedOption_lang, setSelectedOption_lang] =
    useState(currentLanguage);
  const handleOptionChange_lang = (e) => {
    const selectedLanguage = e.target.value;
    setSelectedOption_lang(selectedLanguage);
    // i18n.changeLanguage(selectedLanguage);
    dispatch(setLanguage(selectedLanguage));
  };

  const handleLogOut = () => {
    enqueueSnackbar({
      variant: "success",
      message: "Logout successful",
    });
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("email");
    dispatch(setauth(false));
    navigate("/");
  };
  return (
    <div className="head  heding_text_size ">
      <Navbar
        expand="lg"
        className="main_color p-0 w-100 d-flex justify-content-center"
      >
        <div className="p-0 m-0 container-xxl">
          <Navbar.Brand href="/">
            <div
              style={{ fontWeight: "bolder", borderRight: "1px solid black" }}
              className="d-flex justify-content-center align-items-center"
            >
              <img src={img} alt="ii" className="img_in_nav" />
              <span className="brand_nav">{t("ribbon.brand")}</span>
            </div>
          </Navbar.Brand>
          {isLoggedIn && (
            <div className=" align-items-center profile_log_out_icon_1">
              <i className="bi bi-person-fill me-4"> </i>
              <i
                className="bi bi-box-arrow-right me-4"
                style={{ cursor: "pointer" }}
                title="Log out"
                onClick={handleLogOut}
              ></i>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </div>
          )}
          {!isLoggedIn && <Navbar.Toggle aria-controls="basic-navbar-nav" />}

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {!isLoggedIn && (
                <Nav.Link
                  href="/login"
                  id="log_in_box"
                  style={{ color: "grey" }}
                >
                  {t("landingHeader.login")}
                </Nav.Link>
              )}
              {!isLoggedIn && (
                <Nav.Link
                  href="/singup"
                  id="log_in_box"
                  style={{ color: "grey" }}
                >
                  {t("landingHeader.signup")}
                </Nav.Link>
              )}
              <NavDropdown
                title={t("ribbon.Cryptocurrencies")}
                id="basic-nav-dropdown"
              ></NavDropdown>
              <NavDropdown
                title={t("ribbon.Exchanges")}
                id="basic-nav-dropdown"
              ></NavDropdown>
              <NavDropdown
                title={t("ribbon.Community")}
                id="basic-nav-dropdown"
              ></NavDropdown>
              <NavDropdown
                title={t("ribbon.Products")}
                id="basic-nav-dropdown"
              ></NavDropdown>
              <NavDropdown
                title={t("ribbon.learn")}
                id="basic-nav-dropdown"
              ></NavDropdown>
              <Nav.Link
                onClick={() => navigate("/plan")}
                style={{ color: "grey" }}
              >
                Upgrade Plan
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div className="ms-auto align-items-center profile_log_out_icon">
            <div className="h-auto d-flex align-content-center">
              <select
                className="rem_bor me-4"
                value={selectedOption_lang}
                onChange={handleOptionChange_lang}
              >
                <option value="en">English</option>
                <option value="es">Espenol</option>
              </select>
            </div>
            {isLoggedIn ? (
              <>
                <i className="bi bi-person-fill me-4"> </i>
                <i
                  className="bi bi-box-arrow-right"
                  style={{ cursor: "pointer" }}
                  title="Log out"
                  onClick={handleLogOut}
                ></i>
              </>
            ) : (
              <>
                <div
                  className="log_in_box h-auto d-flex  align-content-center flex-wrap"
                  style={{ backgroundColor: "darkgray" }}
                >
                  <Link className="remove_dec text-white" to="/login">
                    {t("landingHeader.login")}
                  </Link>
                </div>

                <div
                  className="log_in_box h-auto d-flex align-content-center flex-wrap "
                  style={{ backgroundColor: "darkgray" }}
                >
                  <Link className="remove_dec text-white" to="/signup">
                    {t("landingHeader.signup")}
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </Navbar>
    </div>
  );
}

export default Header2;
