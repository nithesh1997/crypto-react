import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useTranslation } from "react-i18next";
import { setLanguage, setauth } from "../../languageSlice";
import { useDispatch, useSelector } from "react-redux";
// import i18n from "../../Helper/i18next";
const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state) => state.currentLanguage);
  const apidata = useSelector((state) => state.headerdata?.data);
  const [selectedOption_lang, setSelectedOption_lang] =
    useState(currentLanguage);
  const [selectedOption_curency, setSelectedOption_curency] = useState("USD");

  const handleOptionChange_lang = (e) => {
    const selectedLanguage = e.target.value;
    setSelectedOption_lang(selectedLanguage);
    // i18n.changeLanguage(selectedLanguage);
    dispatch(setLanguage(selectedLanguage));
  };

  const color = {
    market_cap_change_percentage_24h_usd:
      apidata?.market_cap_change_percentage_24h_usd > 0 ? "grenn" : "red",
  };
  const formatNumber = (number) => {
    const suffixes = ["", "K", "M", "B", "T"];
    let suffixNum = 0;

    while (number >= 1000 && suffixNum < suffixes.length - 1) {
      suffixNum++;
      number /= 1000;
    }
    return `${number?.toFixed(2)} ${suffixes[suffixNum]}`;
  };

  return (
    <>
      <div className="header d-flex justify-content-between  heding_text_size container-xxl">
        <div className="d-flex align-content-center flex-wrap">
          <div className="header-text  justify-content-between align-items-center ">
            {t("api.active_cryptocurrencies")}:{" "}
            <span>{apidata?.active_cryptocurrencies}</span> |{" "}
            {t("api.in_market_coins")}: <span>{apidata?.markets}</span> |{" "}
            {t("api.total_market_cap")}:{" "}
            <span>${formatNumber(apidata?.total_market_cap.aud)}</span> |{" "}
            {t("api.total_volume")}:{" "}
            <span>${formatNumber(apidata?.total_volume.btc)}</span> |{" "}
            {t("api.market_cap_change_percentage_24h_usd")}:
            <span
              style={{
                color:
                  apidata?.market_cap_change_percentage_24h_usd > 0
                    ? "green"
                    : "red",
              }}
            >
              <i
                className={
                  apidata?.market_cap_change_percentage_24h_usd > 0
                    ? "bi bi-caret-up-fill"
                    : "bi bi-caret-down-fill"
                }
              ></i>
              {parseFloat(
                apidata?.market_cap_change_percentage_24h_usd.toFixed(2)
              )}
              %
            </span>{" "}
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
