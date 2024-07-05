import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import axios from "axios";
const CoinInfo = ({ name, id }) => {
  const navigate = useNavigate();
  const [coinData, setCoinData] = useState({});
  // const glo_state_dta = useSelector((state) => state.tabeldata);

  // // var sepcoin =[];
  // // if(glo_state_dta){
  // let sepcoin = glo_state_dta?.filter((a) => a.symbol == name?.toLowerCase());
  // // }
  const { t } = useTranslation();
  const formatNumber = (number) => {
    const suffixes = ["", "K", "M", "B", "T"];
    let suffixNum = 0;

    while (number >= 1000 && suffixNum < suffixes.length - 1) {
      suffixNum++;
      number /= 1000;
    }
    return `${number?.toFixed(2)} ${suffixes[suffixNum]}`;
  };
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`https://api.coingecko.com/api/v3/coins/${id}`)
        .then((res) => setCoinData(res?.data));
    };
    fetchData();
  }, []);

  return (
    <div className="w-100">
      {coinData && (
        <div
          style={{
            boxShadow: "0px 0px 10px #00000012",
            padding: "10px 10px 10px 10px",
            marginTop: "5px",
            height: "100%",
          }}
        >
          <button
            onClick={() => navigate(-1)}
            className="border-0 rounded-pill"
          >
            <i
              className="bi bi-arrow-left-circle-fill p-2"
              style={{ fontSize: "27", marginRight: "1px" }}
            >
              {" "}
              Back
            </i>
          </button>
          <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
            {coinData && (
              <img
                src={coinData?.image?.small}
                alt={coinData?.name}
                style={{ width: "50px", height: "50px" }}
              />
            )}
            <p className="fw-bold h3  p-2">{coinData?.name}</p>
            <div
              className="border-bottom fw-bold"
              style={{ fontSize: "43px", color: "#7272a3" }}
            >
              ${coinData?.market_data?.current_price?.usd}
            </div>
            <div>
              <div
                style={{ margin: "20px", fontSize: "15px" }}
                className="d-flex"
              >
                <div className="text-secondary">{"Symbol"}</div>
                <div className="ms-auto fw-semibold">
                  {coinData?.symbol}
                </div>{" "}
              </div>

              <div
                style={{ margin: "20px", fontSize: "15px" }}
                className="d-flex"
              >
                <div className="text-secondary">
                  {t("coinsdetails.24hrhigh")}
                </div>
                <div className="ms-auto fw-semibold" style={{ color: "green" }}>
                  ${coinData?.market_data?.high_24h?.usd}
                </div>
              </div>
              <div
                style={{ margin: "20px", fontSize: "15px" }}
                className="d-flex"
              >
                <div className="text-secondary">{t("coinsdetails.24hrlo")}</div>
                <div className="ms-auto fw-semibold" style={{ color: "red" }}>
                  ${coinData?.market_data?.low_24h?.usd}
                </div>
              </div>
              <div
                style={{ margin: "20px", fontSize: "15px" }}
                className="d-flex"
              >
                <div className="text-secondary">
                  {t("coinsdetails.marcap24hr")}
                </div>
                <div
                  className="ms-auto fw-semibold"
                  style={{
                    color:
                      coinData?.market_data?.market_cap_change_24h_in_currency
                        ?.usd > 0
                        ? "green"
                        : "red",
                  }}
                >
                  <div>
                    $
                    {formatNumber(
                      coinData?.market_data?.market_cap_change_24h_in_currency
                        ?.usd
                    )}
                  </div>
                </div>
              </div>
              <div
                style={{ margin: "20px", fontSize: "15px" }}
                className="d-flex"
              >
                <div className="text-secondary">
                  {t("coinsdetails.marcap24hr")}
                </div>
                <div className="ms-auto fw-semibold">
                  <div>
                    {parseFloat(
                      coinData?.market_data?.market_cap_change_percentage_24h.toFixed(
                        2
                      )
                    )}
                    %
                  </div>
                </div>
              </div>
              <div
                style={{ margin: "20px", fontSize: "15px" }}
                className="d-flex"
              >
                <div className="text-secondary">{t("coinsdetails.pri1hr")}</div>
                <div className="ms-auto fw-semibold">
                  <div
                    style={{
                      color:
                        coinData?.market_data
                          ?.price_change_percentage_1h_in_currency?.usd > 0
                          ? "green"
                          : "red",
                    }}
                  >
                    <i
                      class={
                        coinData?.market_data?.price_change_percentage_1h_in_currency?.usd.toFixed(
                          2
                        ) > 0
                          ? "bi bi-caret-up-fill"
                          : "bi bi-caret-down-fill"
                      }
                    ></i>
                    {parseFloat(
                      coinData?.market_data?.price_change_percentage_1h_in_currency?.usd.toFixed(
                        2
                      )
                    )}
                    $
                  </div>
                </div>
              </div>

              <div
                style={{ margin: "20px", fontSize: "15px" }}
                className="d-flex"
              >
                <div className="text-secondary">
                  {t("coinsdetails.pri24hr")}
                </div>
                <div className="ms-auto fw-semibold">
                  <div
                    style={{
                      color:
                        coinData?.market_data?.price_change_percentage_24h_in_currency?.usd.toFixed(
                          2
                        ) > 0
                          ? "green"
                          : "red",
                    }}
                  >
                    <i
                      class={
                        coinData?.market_data?.price_change_percentage_24h_in_currency?.usd.toFixed(
                          2
                        ) > 0
                          ? "bi bi-caret-up-fill"
                          : "bi bi-caret-down-fill"
                      }
                    ></i>
                    {parseFloat(
                      coinData?.market_data?.price_change_percentage_24h_in_currency?.usd.toFixed(
                        2
                      )
                    )}
                    $
                  </div>
                </div>
              </div>
              <div
                style={{ margin: "20px", fontSize: "15px" }}
                className="d-flex"
              >
                <div className="text-secondary">{t("coinsdetails.pri7d")}</div>
                <div className="ms-auto fw-semibold">
                  <div
                    style={{
                      color:
                        coinData?.market_data?.price_change_percentage_7d_in_currency?.usd.toFixed(
                          2
                        ) > 0
                          ? "green"
                          : "red",
                    }}
                  >
                    <i
                      class={
                        coinData?.market_data?.price_change_percentage_7d_in_currency?.usd.toFixed(
                          2
                        ) > 0
                          ? "bi bi-caret-up-fill"
                          : "bi bi-caret-down-fill"
                      }
                    ></i>
                    {parseFloat(
                      coinData?.market_data?.price_change_percentage_7d_in_currency?.usd.toFixed(
                        2
                      )
                    )}
                    $
                  </div>
                </div>
              </div>
              <div
                style={{ margin: "20px", fontSize: "15px" }}
                className="d-flex"
              >
                <div className="text-secondary">{t("coinsdetails.volume")}</div>
                <div className="ms-auto fw-semibold">
                  {coinData?.market_data?.total_volume?.usd}$
                </div>
              </div>
              <div
                style={{ margin: "20px", fontSize: "15px" }}
                className="d-flex"
              >
                <div className="text-secondary">
                  {t("coinsdetails.alltimehigh")}
                </div>
                <div className="ms-auto fw-semibold" style={{ color: "green" }}>
                  {coinData?.market_data?.ath?.usd}$
                </div>
              </div>
              {/* <div style={{margin:"20px",fontSize:"15px"}} className="d-flex"><div>{t('coinsdetails.allitmehighper')}</div><div className="ms-auto fw-semibold" style={{color:sepcoin[0]?.ath_change_percentage>0?"green":"red" }}>{ parseFloat(sepcoin[0].ath_change_percentage.toFixed(2))}%</div></div> */}
              <div
                style={{ margin: "20px", fontSize: "15px" }}
                className="d-flex"
              >
                <div className="text-secondary">
                  {t("coinsdetails.alltimelow")}
                </div>
                <div className="ms-auto fw-semibold" style={{ color: "red" }}>
                  {coinData?.market_data?.atl?.usd}$
                </div>
              </div>
              <div>
                <p className="h5 fw-bold border-bottom p-2">Info</p>
                <div
                  style={{ margin: "20px", fontSize: "15px" }}
                  className="d-flex"
                >
                  <div className="text-secondary">
                    {t("coinsdetails.webesite")}
                  </div>
                  <div className="ms-auto fw-semibold">
                    {coinData?.links?.homepage.map(
                      (url) =>
                        url && (
                          <a
                            className="rounded-pill info-urls"
                            href={url}
                            target="_blank"
                          >
                            {
                              url
                                .replace(/(^\w+:|^)\/\/(www\.)?/, "")
                                .split("/")[0]
                            }
                          </a>
                        )
                    )}
                  </div>
                </div>
                <div
                  style={{ margin: "20px", fontSize: "15px" }}
                  className="d-flex"
                >
                  <div className="text-secondary">
                    {t("coinsdetails.Explorers")}
                  </div>
                  <div className="ms-auto fw-semibold">
                    <select
                      onChange={(e) => window.open(e.target.value, "_blank")}
                      className="rounded-pill border-0 info-urls"
                    >
                      {coinData?.links?.blockchain_site?.map(
                        (url, index) =>
                          url && (
                            <option key={index} value={url}>
                              <p>
                                {
                                  url
                                    .replace(/(^\w+:|^)\/\/(www\.)?/, "")
                                    .split("/")[0]
                                }
                              </p>
                            </option>
                          )
                      )}
                    </select>
                  </div>
                </div>
                <div
                  style={{ margin: "20px", fontSize: "15px" }}
                  className="d-flex"
                >
                  <div className="text-secondary">
                    {t("coinsdetails.Twitter")}
                  </div>
                  <div className="ms-auto fw-semibold">
                    <a
                      href={`https://twitter.com/${coinData?.id}`}
                      target="_blank"
                      className="rounded-pill info-urls"
                    >
                      <i class="fa-brands fa-square-x-twitter"></i>
                      {coinData?.name}
                    </a>
                  </div>
                </div>
                <div
                  style={{ margin: "20px", fontSize: "15px" }}
                  className="d-flex"
                >
                  <div className="text-secondary">
                    {t("coinsdetails.redit")}
                  </div>
                  <div className="ms-auto fw-semibold">
                    <a
                      href={coinData?.links?.subreddit_url}
                      className="rounded-pill info-urls"
                    >
                      {t("coinsdetails.redit")}
                    </a>
                  </div>
                </div>
                <div
                  style={{ margin: "20px", fontSize: "15px" }}
                  className="d-flex"
                >
                  <div className="text-secondary">
                    {" "}
                    {t("coinsdetails.sourcecode")}
                  </div>
                  <div className="ms-auto fw-semibold">
                    <a
                      href={`https://github.com/${id}`}
                      className="rounded-pill info-urls"
                    >
                      Github
                    </a>
                  </div>
                </div>
              </div>
              {/* <div style={{margin:"20px",fontSize:"15px"}} className="d-flex"><div>{t('coinsdetails.alltimelower')}</div><div className="ms-auto fw-semibold" style={{color:"green"}}>{ parseFloat(sepcoin[0]?.atl_change_percentage.toFixed(2))}$</div></div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CoinInfo;
