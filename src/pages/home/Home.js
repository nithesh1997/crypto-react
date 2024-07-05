import React, { Component, useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import cData from "../../data/sampleCoinData.json";
import { useNavigate } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import "./home.css";
import NavBar from "../../NavBar";
import { useTranslation } from "react-i18next";
import LanderpageTable from "../Component/LanderpageTable";
import { useSelector, useDispatch } from "react-redux";
import i18n from "../../Helper/i18next";
import LandingPageHeader2 from "../Component/LandinpageHeader2";
import ContentLandingpage from "../Component/contentLandingpage";
import Header2 from "../Component/Header2";
import { setauth } from "../../languageSlice";
import Header from "../Component/Header";
const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const currentLanguage = useSelector((state) => state.currentLanguage);

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(25);
  //const [activePage, setActivePage] = useState(1);
  const sampleData = cData["data"]["coins"];
  const numPage = 10;
  const [curr, set_Curr] = useState(1);

  const totalDataLength = (count) => {
    return count > limit ? getDividedLength(count) : 1;
  };
  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, []);

  const getDividedLength = (count) => {
    let totalCount = 1;
    const quotient = Math.floor(count / limit);
    const reminder = count % limit;
    totalCount = reminder === 0 ? quotient : quotient + 1;
    return totalCount;
  };

  const maxLimit = totalDataLength(sampleData.length);

  const handleClick = (coin) => {
    navigate("/coindetails", { state: coin });
  };

  const getCoinPrice = (coin) => {
    return "$" + parseFloat(coin).toFixed(3);
  };

  useEffect(() => {
    loadCoinData(0);
  }, []);

  const loadCoinData = (page) => {
    let temp = [];
    let inital = limit * page;
    let count = inital + limit;
    sampleData.map((itm, idx) => {
      if (idx === inital && idx < count) {
        temp.push(itm);
        inital = inital + 1;
      }
    });
    setData(temp);
  };

  const pageChangeFunction = (p) => {
    if (p >= 1 && p <= maxLimit) {
      set_Curr(p);
      setData([]);
      loadCoinData(p);
    }
  };

  const getCoinList = (e) => {
    //alert(e.target.value)
    const vl = e.target.value?.toLocaleLowerCase();
    if (vl.length >= 3) {
      const filterdata = sampleData.filter(function (el) {
        return el.name?.toLocaleLowerCase().includes(vl);
      });
      //console.log(filterdata)
      setData(filterdata);
      showPageItemsFunction();
    } else if (vl.length === 0) {
      loadCoinData(0);
    }
  };

  const showPageItemsFunction = () => {
    const data = [];
    if (maxLimit <= numPage) {
      for (let i = 1; i < maxLimit; i++) {
        data.push(
          <Pagination.Item
            key={i}
            active={i === curr}
            onClick={() => pageChangeFunction(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    } else {
      const leftside = curr - numPage / 2 > 1;
      const rightside = curr + numPage / 2 < maxLimit;
      data.push(
        <Pagination.First key="first" onClick={() => pageChangeFunction(1)} />
      );
      data.push(
        <Pagination.Prev
          key="prev"
          onClick={() => pageChangeFunction(curr - 1)}
        />
      );
      if (leftside) {
        data.push(<Pagination.Ellipsis key="leftEllipsis" />);
      }
      const str = Math.max(1, Math.round(curr - numPage / 2));
      const end = Math.min(maxLimit, Math.round(curr + numPage / 2));
      for (let i = str; i <= end; i++) {
        data.push(
          <Pagination.Item
            key={i}
            active={i === curr}
            onClick={() => pageChangeFunction(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
      if (rightside) {
        data.push(<Pagination.Ellipsis key="rightEllipsis" />);
      }
      data.push(
        <Pagination.Next
          key="next"
          onClick={() => pageChangeFunction(curr + 1)}
        />
      );
      data.push(
        <Pagination.Last
          key="last"
          onClick={() => pageChangeFunction(maxLimit)}
        />
      );
    }
    return data;
  };

  return (
    <div>
      {/* <NavBar /> */}
      {/* <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item active" aria-current="page">Home</li>
                </ol>
            </nav> */}
      {/* <LandingPageHeader2 toShow={true} /> */}
      <Header />
      <Header2 />
      <ContentLandingpage />
      <LanderpageTable />

      {/* <div>
        <div
          style={{
            width: "30%",
            marginLeft: "auto",
            marginRight: "0",
            marginTop: "15px",
          }}
        >
          <div class="form-group has-search">
            <span class="bi bi-search form-control-feedback"></span>
            <input
              type="text"
              class="form-control"
              placeholder={t("table.search")}
              onChange={getCoinList}
            />
          </div>
        </div>
      </div>
      <div id="home" className="lyt">
        <div
          className="container"
          style={{
            fontSize: "14px",
            borderBottom: "0px solid #e9e9eb",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          <div
            className="row p-1"
            style={{
              borderBottom: "1px solid #f3f3f4",
              margin: "10px 2px 0 2px",
            }}
          >
            <div className="col d-flex">
              <div style={{ marginRight: "30px" }}></div>
              <div className="col" style={{ fontWeight: 500 }}>
                {t("table.name")}
              </div>
            </div>
            <div className="col" style={{ fontWeight: 500 }}>
              {t("table.marketcap")}
            </div>
            <div className="col">
              <div style={{ marginLeft: "32%", fontWeight: 500 }}>
                {t("table.past")}
              </div>
              <div className="col d-flex" style={{ marginTop: "5px" }}>
                <div
                  className="col"
                  style={{ fontWeight: 500, fontSize: "13px" }}
                >
                  {" "}
                  {t("table.1hr")}{" "}
                </div>
                <div
                  className="col"
                  style={{ fontWeight: 500, fontSize: "13px" }}
                >
                  {" "}
                  {t("table.24hr")}{" "}
                </div>
                <div
                  className="col"
                  style={{ fontWeight: 500, fontSize: "13px" }}
                >
                  {" "}
                  {t("table.7d")}{" "}
                </div>
              </div>
            </div>
            <div className="col">
              <div style={{ marginLeft: "32%", fontWeight: 500 }}>
                {t("table.Predicted")}
              </div>
              <div className="col d-flex" style={{ marginTop: "5px" }}>
                <div
                  className="col"
                  style={{ fontWeight: 500, fontSize: "13px" }}
                >
                  {" "}
                  30m{" "}
                </div>
                <div
                  className="col"
                  style={{ fontWeight: 500, fontSize: "13px" }}
                >
                  {" "}
                  1h{" "}
                </div>
                <div
                  className="col"
                  style={{ fontWeight: 500, fontSize: "13px" }}
                >
                  {" "}
                  24h{" "}
                </div>
              </div>
            </div>
            <div className="col" style={{ fontWeight: 500 }}>
              {t("table.price")}
            </div>
          </div>
       
          <div style={{ margin: "10px 0px" }}>
            {data.map((coin, index) => (
              <div
                className="row p-2 mt-1 sgl"
                style={{ borderBottom: "1px solid #f6f6f7", margin: "0 2px" }}
                key={coin.uuid}
                onClick={() => handleClick(coin)}
              >
                <div className="col d-flex">
                  <div style={{ marginRight: "20px", fontSize: "13px" }}>
                    {coin.rank}
                  </div>
                  <img
                    className="img"
                    style={{ width: "20px", height: "20px" }}
                    src={coin.iconUrl}
                    alt=""
                  />
                  <div style={{ margin: "0 10px" }}>{coin.name}</div>
                </div>
                <div className="col">
                  <div style={{ margin: "0 0px", fontSize: "13px" }}>
                    {getCoinPrice(coin.marketCap)}
                  </div>
                </div>
                <div className="col d-flex">
                  <div className="col" style={{ fontSize: "13px" }}>
                    {" "}
                    {coin.change}{" "}
                  </div>
                  <div className="col" style={{ fontSize: "13px" }}>
                    {coin.change}
                  </div>
                  <div className="col" style={{ fontSize: "13px" }}>
                    {coin.change}
                  </div>
                </div>
                <div className="col d-flex">
                  <div className="col" style={{ fontSize: "13px" }}>
                    {" "}
                    {coin.change}{" "}
                  </div>
                  <div className="col" style={{ fontSize: "13px" }}>
                    {coin.change}
                  </div>
                  <div className="col" style={{ fontSize: "13px" }}>
                    {coin.change}
                  </div>
                </div>
                <div className="col">
                  <div
                    style={{
                      margin: "0 0px",
                      color: coin.color,
                      fontSize: "13px",
                    }}
                  >
                    {getCoinPrice(coin.price)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            marginTop: "20px",
            marginRight: "20px",
          }}
        >
          <Pagination>{showPageItemsFunction()}</Pagination>
        </div>
      </div> */}
    </div>
  );
};
export default Home;
