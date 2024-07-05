import React from "react";
import DarkVariantExample from "./DarkVariantExample";
import CommunityPost from "./CommunityPost";
import GaugeChartLAnder from "./LanderGAugechart";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function ContentLandingpage() {
  const { t } = useTranslation();
  const apidata = useSelector((state) => state.headerdata?.data);
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
    <div className="container-xxl mt-3">
      <div className="contentpage_header_side">
        <div className="contengtpage_head d-flex align-items-center">
          <p>{t("markdetails.TodaysCryptocurrencyPricesbyMarketCap")}</p>
        </div>
        <div className=" d-flex align-items-center">
          <p>
            {t("markdetails.todayprice")}{" "}
            <span style={{ color: "blue" }}>
              ${formatNumber(apidata?.total_market_cap.aud)}
            </span>
            , {t("markdetails.a")}{" "}
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
            </span>
            {t("markdetails.change")}.
          </p>
        </div>
      </div>
      <div>
        <div className="d-flex justify-content-around carousel_main_box row">
          <div className="col-lg-4 mb-4">
            <CommunityPost />
          </div>
          <div className="col-lg-4 mb-4">
            <DarkVariantExample />
          </div>

          <div className="col-lg-4 mb-4">
            <GaugeChartLAnder />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentLandingpage;
