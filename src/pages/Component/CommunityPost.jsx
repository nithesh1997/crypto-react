import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
function CommunityPost() {
  const apidata = useSelector((state) => state.generalData.carsoul1?.data);
  const data = apidata.slice(0, 2);
  const { t } = useTranslation();
  const formatNumber = (number) => {
    if (typeof number == "string") {
      number = parseFloat(number.replace(/[$,]/g, ""));
    }
    const suffixes = ["", "K", "M", "B", "T"];
    let suffixNum = 0;

    while (number >= 1000 && suffixNum < suffixes.length - 1) {
      suffixNum++;
      number /= 1000;
    }
    return `${number?.toFixed(2)} ${suffixes[suffixNum]}`;
  };
  return (
    <div
      className="p-3 d-flex flex-column justify-content-center"
      style={{
        borderRadius: "20px",
        height: "100%",
        backgroundColor: "#f9f9f9",
        border: "1px solid rgb(235, 224, 224)",
      }}
    >
      <h4>{t("carsoul.trending")}</h4>
      <div>
        {data.map((a) => (
          <div className="d-flex  box_for_trending p-1">
            <div className="d-flex flex-column justify-content-center w-50 ">
              <div className="d-flex w-100 gap-1 align-items-center">
                <div>
                  <img src={a.item.small} width={20} /> {a.item.name}
                </div>
              </div>
              <div className="w-100" style={{ fontSize: "13px" }}>
                <span style={{ color: "#6c757d" }}>Price </span>
                <span style={{ fontSize: "13px", color: "blue" }}>
                  ${formatNumber(a.item.data.price)}
                </span>
              </div>
              <div className="w-100" style={{ fontSize: "13px" }}>
                <span style={{ color: "#6c757d" }}>Market Cap</span> $
                {formatNumber(a.item.data.market_cap)}
              </div>
            </div>
            <div className="w-50 d-flex justify-content-end align-items-center">
              <img src={a.item.data.sparkline} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommunityPost;
