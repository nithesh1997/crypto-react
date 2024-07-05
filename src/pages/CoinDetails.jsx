import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Card, CardBody } from "react-bootstrap";
import Checkbox from "./Checkbox";
import CoinInfo from "./coinInfo";
import CoinAnalysis from "./CoinAnalysis";
import DoubleLine from "./DoubleLine";
import MultiLine from "./MultiLine";

import MultiselectCheckbox from "./MultiselectCheckbox";
import cData from "../data/sampleCoinData.json";
import { TestData } from "../Helper/Helper";
import ListOfData from "../data/expectedDataFormat.json";
import NavBar from "../NavBar";
import Communtypostcoinsdetails from "./Component/Communtypostcoinsdetails";
import SocialMediapost from "./Component/Social Media post";
import { useTranslation } from "react-i18next";

import { useSelector } from "react-redux";
// import i18n from "../Helper/i18next";
import PredictionChart from "./Component/PredictionChart";
import { TestSingleData } from "../Helper/Helper";
import TimeBasedPredictionChart from "./Component/TimeBasedPredictionChart";
import Header from "./Component/Header";
import LandingPageHeader2 from "./Component/LandinpageHeader2";
import Header2 from "./Component/Header2";
const SampleData = ListOfData.data;

const CoinDetails = () => {
  const location = useLocation();
  const currentLanguage = useSelector((state) => state.currentLanguage);

  // useEffect(() => {
  //   i18n.changeLanguage(currentLanguage);
  // }, []);

  return (
    <>
      <div className="App">
        <Header />
        {/* <NavBar /> */}
        {/* <LandingPageHeader2 toShow={true} /> */}
        <Header2 landing={false} />
        <div style={{ marginTop: "5px" }} className="container-xxl">
          <div className="w-100 d-flex">
            <div className="w-25">
              <div style={{ width: "100%", height: "100%" }}>
                <CoinInfo
                  name={location.state?.symbol}
                  id={location.state?.id}
                />
              </div>
            </div>
            <div className="w-75 d-flex flex-column">
              <div
                style={{
                  width: "100%",
                  padding: "10px",
                  boxShadow: "0px 0px 10px #00000012",
                  marginLeft: "5px",
                  marginTop: "5px",
                }}
              >
                {/* <DoubleLine name={location.state.name} /> */}
                <PredictionChart coinData={TestSingleData()} />
              </div>
              <div
                style={{
                  width: "100%",
                  boxShadow: "0px 0px 10px #00000012",
                  padding: "10px",
                  marginLeft: "5px",
                  marginTop: "5px",
                }}
              >
                {/* <div style={{ marginTop: "15px" }}>
            <MultiselectCheckbox
              options={options}
              onChange={(data) => {
                onCheckBoxChange(data);
              }}
            />
            <div
              style={{
                borderBottom: " 1px solid #e9e9eb",
                boxShadow: "0px 0px 10px #00000012",
              }}
            >
              {chartData !== null && (
                <MultiLine
                  name={location.state.name}
                  data={chartData}
                  timedata={chartTime}
                />
              )}
            </div>
          </div> */}

                <div style={{ marginTop: "5px" }}>
                  <TimeBasedPredictionChart coinData={TestData()} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoinDetails;
