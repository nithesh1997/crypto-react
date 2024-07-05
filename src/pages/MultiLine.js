import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  ColorType,
  createChart,
  LineStyle,
  CrosshairMode,
} from "lightweight-charts";
import { Container, Row, Col } from "react-bootstrap";
import Box from "./Box";
import { TestData } from "../Helper/Helper";
import { useTranslation } from 'react-i18next';
const MultiLine = ({ name, data, timedata }) => {
  const {t}=useTranslation();
  const chartContainerRef = useRef();
  const [actualLinePrice, setActualLinePrice] = useState(null);
  const [predictLinePrice, setPredictLinePrice] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
        crosshair: {
          // Change mode from default 'magnet' to 'normal'.
          // Allows the crosshair to move freely without snapping to datapoints
          mode: CrosshairMode.Normal,

          // Vertical crosshair line (showing Date in Label)
          vertLine: {
            width: 8,
            color: "#C3BCDB44",
            style: LineStyle.Solid,
            labelBackgroundColor: "#9B7DFF",
          },

          // Horizontal crosshair line (showing Price in Label)
          horzLine: {
            color: "#9B7DFF",
            labelBackgroundColor: "#9B7DFF",
          },
        },
      });
    };

    const chart = createChart(chartContainerRef.current, {
      color: "#2962FF",
      layout: {
        fontFamily: "Poppins",
        fontSize: 12,
        textColor: "#727FA4",
        background: { type: ColorType.Solid, color: "white" },
      },
      timeScale: {
        timeVisible: true,
        borderVisible: false,
      },
      rightPriceScale: {
        autoScale: true,
        entireTextOnly: false,
        visible: true,
        alignLabels: true,
        scaleMargins: {
          top: 0,
          bottom: 0.15,
        },
      },
      leftPriceScale: {
        borderColor: "#727FA4",
        entireTextOnly: true,
        visible: false,
        drawTicks: true,
        scaleMargins: {
          top: 0.5,
          bottom: 0.1,
        },
      },
      grid: {
        vertLines: {
          color: "rgba(197, 203, 206, 0.4)",
          style: LineStyle.Dotted,
        },
        horzLines: {
          color: "rgba(197, 203, 206, 0.4)",
          style: LineStyle.Dotted,
        },
      },
      width: chartContainerRef.current.clientWidth,
      height: 220,
    });

    let chartNameActual; //var declaration (undo if need)
    let chartNamePredict;

    if (timedata[0]?.value === 0 || timedata?.length === 0) {
      const currentData = data[0]?.["0"];
      get0minData(chart, chartNameActual, chartNamePredict, currentData);
    }

    // actual line (blue color)
    timedata.map((item, idx) => {
      const timeValue = item.value;

      if (item.value === 15) {
        let index = data.findIndex((obj) => timeValue in obj);
        const fiftinData = data[index]?.["15"];
        get15minData(chart, chartNameActual, chartNamePredict, fiftinData);
      }
      if (item.value === 30) {
        let index = data.findIndex((obj) => timeValue in obj);
        const secondData = data[index]?.["30"];
        get30MinData(chart, chartNameActual, chartNamePredict, secondData);
      }

      if (item.value === 60) {
        let index = data.findIndex((obj) => timeValue in obj);
        const thirdData = data[index]?.["60"];
        get60MinData(chart, chartNameActual, chartNamePredict, thirdData);
      }
    });

    //   legend code start
    chart.subscribeCrosshairMove((param) => {
      if (param.time) {
        const actualData = param.seriesData.get(chartNameActual);
        const predictData = param.seriesData.get(chartNamePredict);
        setActualLinePrice(actualData);
        setPredictLinePrice(predictData);
      }
    });

    chart.timeScale().fitContent();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data]);

  const get60MinData = (
    chart,
    chartNameActual,
    chartNamePredict,
    thirdData
  ) => {
    chartNameActual = chart.addLineSeries({
      color: "#cc33ff",
    });
    // predic line (green color)
    chartNamePredict = chart.addLineSeries({
      color: "#990000",
      lineStyle: 2,
    });
    chartNameActual.setData(thirdData?.actual);
    chartNamePredict.setData(thirdData?.predict);
  };

  const get30MinData = (
    chart,
    chartNameActual,
    chartNamePredict,
    secondData
  ) => {
    chartNameActual = chart.addLineSeries({
      color: "#cc33ff",
    });
    // predic line (green color)
    chartNamePredict = chart.addLineSeries({
      color: "#669900",
      lineStyle: 2,
    });
    chartNameActual.setData(secondData?.actual);
    chartNamePredict.setData(secondData?.predict);
  };

  const get15minData = (
    chart,
    chartNameActual,
    chartNamePredict,
    fiftinData
  ) => {
    chartNameActual = chart.addLineSeries({
      color: "#cc33ff",
      lineWidth: 3,
    });
    // predic line (green color)
    chartNamePredict = chart.addLineSeries({
      color: "#2962FF",
      lineStyle: 1,
      lineWidth: 3,
    });
    chartNameActual.setData(fiftinData?.actual);
    chartNamePredict.setData(fiftinData?.predict);
  };

  const get0minData = (
    chart,
    chartNameActual,
    chartNamePredict,
    currentData
  ) => {
    chartNameActual = chart.addLineSeries({
      color: "#cc33ff",
      lineWidth: 3,
    });
    // predic line (green color)
    chartNamePredict = chart.addLineSeries({
      color: "#2962FF",
      lineStyle: 1,
      lineWidth: 3,
    });
    chartNameActual.setData(currentData?.actual);
    // chartNamePredict.setData(fiftinData?.predict);
  };

  return (
    <div className="App">
      {data   && (
        <div ref={chartContainerRef} style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: 20,
              left: 30,
              zIndex: 20,
              color: "black",
            }}
          >
            <div style={{ fontFamily: "Poppins", color: "#ab4505", fontSize: '13px' }}>
            {t('landingHeader.coinsymbal')}: {name}
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ marginRight: 10, fontFamily: "Poppins", fontSize: '13px' }}>
              {t('landingHeader.actualprice')}: {actualLinePrice?.value}
              </div>
              <div style={{ marginRight: 10, fontFamily: "Poppins", fontSize: '13px' }}>
              {t('landingHeader.predictedprice')}: {predictLinePrice?.value}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiLine;
