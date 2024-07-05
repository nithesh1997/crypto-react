import React, { Component, useState, useEffect } from "react";
import HoverBoxHeading from "./HoverBoxHeading";
import LinkList from "./LinkList";
import { useTranslation } from "react-i18next";
import img from "../../photos/logo2.png";
import { useNavigate } from "react-router-dom";

const LandingPageHeader2 = ({ toShow }) => {
  const CryptocurrenciesData = [
    {
      heading: "Cryptocurrencies",
      list: [
        {
          lable: "Ranking",
          link: "/login",
        },
        {
          lable: "Categories",
          link: "/login",
        },
        {
          lable: "Global Chart",
          link: "/login",
        },
        {
          lable: "Historical Snapchart",
          link: "/login",
        },
        {
          lable: "BitCoin ETFs",
          link: "/login",
        },
      ],
    },
    {
      heading: "Leader Board",
      list: [
        {
          lable: "Trending",
          link: "/login",
        },
        {
          lable: "Recently Added",
          link: "/login",
        },
        {
          lable: "Gainers",
          link: "/login",
        },
        {
          lable: "Most Visited",
          link: "/login",
        },
      ],
    },
    {
      heading: "NFT",
      list: [
        {
          lable: "coin",
          link: "/login",
        },
        {
          lable: "rs",
          link: "/login",
        },
      ],
    },
    {
      heading: "On Chain Data",
      list: [
        {
          lable: "coin",
          link: "/login",
        },
        {
          lable: "rs",
          link: "/login",
        },
      ],
    },
  ];
  const Exchangesdata = [
    { lable: "News", link: "/login" },
    { lable: "Academy", link: "/login" },
    { lable: "Research", link: "/login" },
  ];

  const [Cryptocurrenciesbox, setCryptocurrenciesbox] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleLogOut = () => {
    navigate("/");
  };
  return (
    <div className="header_2 main_color">
      <div className="second_head  d-flex  align-items-center justify-content-between">
        <div className="hover_buttons d-flex justify-content-start  align-items-center gap-4">
          <div
            style={{ fontWeight: "bolder", borderRight: "1px solid black" }}
            className="d-flex justify-content-center align-items-center"
          >
            <img src={img} alt="ii" height={55} />{" "}
            <span
              style={{ fontSize: "24px", padding: "8px", paddingRight: "15px" }}
            >
              {t("ribbon.brand")}
            </span>
          </div>
          {/* <div><div
          className="hover-container"
          onMouseEnter={() => setCryptocurrenciesbox(true)}
          onMouseLeave={() => setCryptocurrenciesbox(false)}
        >
          Cryptocurrencies
          {Cryptocurrenciesbox && (
            <div className="box_in_hreader">
              <HoverBoxHeading data={CryptocurrenciesData} />
            </div>
          )}
        </div></div>
        <div><div
          className="hover-container"
          onMouseEnter={() => setCryptocurrenciesbox(true)}
          onMouseLeave={() => setCryptocurrenciesbox(false)}
        >
          Exchanges
          {Cryptocurrenciesbox && (
            <div className="box_in_hreader">
              <LinkList data={Exchangesdata}/>
             
            </div>
          )}
        </div></div>
        <div><div
          className="hover-container"
          onMouseEnter={() => setCryptocurrenciesbox(true)}
          onMouseLeave={() => setCryptocurrenciesbox(false)}
        >
          Community
          {Cryptocurrenciesbox && (
            <div className="box_in_hreader">
              <HoverBoxHeading data={CryptocurrenciesData} />
            </div>
          )}
        </div></div>
        <div><div
          className="hover-container"
          onMouseEnter={() => setCryptocurrenciesbox(true)}
          onMouseLeave={() => setCryptocurrenciesbox(false)}
        >
          Products
          {Cryptocurrenciesbox && (
            <div className="box_in_hreader">
              <HoverBoxHeading data={CryptocurrenciesData} />
            </div>
          )}
        </div></div>
        <div><div
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
        </div></div> */}
          <div className="underline-on-hover">
            {t("ribbon.Cryptocurrencies")}
          </div>
          <div className="underline-on-hover">{t("ribbon.Exchanges")}</div>
          <div className="underline-on-hover">{t("ribbon.Community")}</div>
          <div className="underline-on-hover">{t("ribbon.Products")}</div>
          <div className="underline-on-hover">{t("ribbon.learn")}</div>
        </div>
        {toShow && (
          <div>
            <i className="bi bi-person-fill me-4"> </i>
            <i
              className="bi bi-box-arrow-right me-4"
              style={{ cursor: "pointer" }}
              title="Log out"
              onClick={() => navigate("/login")}
            ></i>
          </div>
        )}
      </div>
    </div>
  );
};
export default LandingPageHeader2;
