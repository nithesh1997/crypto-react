import React, { useEffect } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
const styles = {
  dial: {
    display: "inline-block",
    width: `300px`,
    height: `20px`,
    color: "#000",
    border: "0.5px solid #fff",
    padding: "2px",
  },
  title: {
    fontSize: "1em",
    color: "#000",
  },
};

const Speedometer = ({ id, value, title }) => {
  const apidata = useSelector(
    (state) => state.generalData?.headerdata?.data?.data?.market_cap_change_percentage_24h_usd
  );

  const { t } = useTranslation();
  return (
    <div className="h-100">
      <div className="graph_in_land h-100 d-flex flex-column justify-content-center p-3">
        <div className="w-100">
          <h6>
            {t("api.market_cap_change_percentage_24h_usd")}{" "}
            <span>
              <i className="bi bi-exclamation-circle"></i>
            </span>
          </h6>{" "}
        </div>
        <div
          style={styles.title}
          className="overflow-hidden garph d-flex justify-content-center align-items-center w-100 "
        >
          <ReactSpeedometer
            maxValue={100}
            minValue={-100}
            value={parseFloat(apidata?.toFixed(4))}
            needleColor="red"
            startColor="red"
            segments={10}
            maxSegmentLabels={10}
            labelFontSize={10}
            valueTextFontSize={10}
            endColor="green"
            textColor="black"
            height={150}
            width={250}
            ringWidth={10}
          />
        </div>
      </div>
    </div>
  );
};

export default Speedometer;
