import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import React, { Component, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import './NavBar.module.css';
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import "./navbar.css";
// import i18n from "./Helper/i18next";
import LinkList from "../Component/LinkList";
// import img from "../src/assets/logo2.png";
import img from "src/assets/logo2.png";

const NavBar = () => {
  const Exchangesdata = [
    { lable: "News", link: "/login" },
    { lable: "Academy", link: "/login" },
    { lable: "Research", link: "/login" },
  ];
  const navigate = useNavigate();
  const { t } = useTranslation();
  const currentLanguage = useSelector((state) => state.currentLanguage);
  const [Cryptocurrenciesbox, setCryptocurrenciesbox] = useState(false);

  const handleLogOut = () => {
    navigate("/login");
  };
  // useEffect(() => {
  //   i18n.changeLanguage(currentLanguage);
  // }, []);
  return (
    <div className="navbar-container main_color">
      <Navbar expand="lg" className="navbar">
        <Container>
          <Navbar.Brand
            as={NavLink}
            to="/"
            style={{ color: "black", fontWeight: "bolder", fontSize: "24px" }}
          >
            <img
              src={img}
              alt="ii"
              height={55}
              style={{ marginBottom: "10px" }}
            />
            <span style={{ padding: "10px", borderRight: "1px solid black" }}>
              {t("ribbon.brand")}
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as={NavLink}
                to="/"
                style={{ fontSize: "20px", fontWeight: "bold" }}
              >
                {t("ribbon.home")}
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/about"
                style={{ fontSize: "20px", fontWeight: "bold" }}
              >
                {t("ribbon.about")}
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/contact"
                style={{ fontSize: "20px", fontWeight: "bold" }}
              >
                {t("ribbon.contact")}
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/contact"
                style={{ fontSize: "20px", fontWeight: "bold" }}
              >
                {t("ribbon.learn")}
                {/* <div
          className="hover-container"
          onMouseEnter={() => setCryptocurrenciesbox(true)}
          onMouseLeave={() => setCryptocurrenciesbox(false)}
        >
         {t('ribbon.learn')}
          {Cryptocurrenciesbox && (
            <div className="box_in_hreader">
              <LinkList data={Exchangesdata}/>
            </div>
          )}
       </div> */}
              </Nav.Link>
            </Nav>
            <Nav>
              <i className="bi bi-person-fill me-4"> </i>
              <i
                class="bi bi-box-arrow-right"
                style={{ cursor: "pointer" }}
                title="Log out"
                onClick={handleLogOut}
              ></i>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
