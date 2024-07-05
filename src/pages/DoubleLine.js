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
import { TestSingleData } from "../Helper/Helper";
import { useTranslation } from 'react-i18next';
const DoubleLine = ({ name }) => {
  const {t}=useTranslation();
  const location = useLocation();
  const chartContainerRef = useRef();
  const tooltipref = useRef();

  const [actualLinePrice, setActualLinePrice] = useState(null);
  const [predictLinePrice, setPredictLinePrice] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);

  //   let chartNameActual; //var declaration (undo if need)
  //   let chartNamePredict;

  //   function crosssyncHandler(e){
  //     if ()
  //     // if (param.time) {
  //     //     const actualData = param.seriesData.get(chartNameActual);
  //     //     const predictData = param.seriesData.get(chartNamePredict);
  //     //     setActualLinePrice(actualData);
  //     //     setPredictLinePrice(predictData);
  //     //   }
  //   }

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
      height: 300,
    });

    let chartNameActual; //var declaration (undo if need)
    let chartNamePredict;

    TestSingleData().data.map((item, idx) => {
      chartNameActual = "chart-actual" + idx;
      chartNamePredict = "chart-pridect" + idx;
      // actual line (blue color)
      if (chartNameActual === "chart-actual0") {
        chartNameActual = chart.addLineSeries({
          color: "green",
          lineWidth: 3,
        });
        // predic line (green color)
        chartNamePredict = chart.addLineSeries({
          color: "red",
          lineStyle: 1,
          lineWidth: 3,
        });
      }

      //   legend code start
      //   chart.subscribeCrosshairMove(crosssyncHandler);

      //   chart.subscribeCrosshairMove(param => {
      //     chartNamePredict
      //   })

      //   chartNameActual;

      if (item.actual.length > 0) {
        chartNameActual.setData(item.actual);
      }

      chartNamePredict.setData(item.predict);

      const toolTipWidth = 80;
      const toolTipHeight = 90;
      const toolTipMargin = 15;

      // Create and style the tooltip html element
      const toolTip = document.createElement("div");
      toolTip.style = `width: 96px; height: 90px; position: absolute; display: none; padding: 8px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: 12px; left: 12px; pointer-events: none; border: 2px solid; border-radius: 2px;font-family: Poppins, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`;
      toolTip.style.background = "white";
      toolTip.style.color = "black";
      toolTip.style.borderColor = "blue";
      chartContainerRef.current.appendChild(toolTip);

      // update tooltip
      chart.subscribeCrosshairMove((param) => {
        if (param.time) {
          const actualData = param.seriesData.get(chartNameActual);
          const predictData = param.seriesData.get(chartNamePredict);
          setActualLinePrice(actualData);
          setPredictLinePrice(predictData);
        }

        if (
          param.point === undefined ||
          !param.time ||
          param.point.x < 0 ||
          param.point.x > chartContainerRef.current.clientWidth ||
          param.point.y < 0 ||
          param.point.y > chartContainerRef.current.clientHeight
        ) {
          toolTip.style.display = "none";
        } else {
          // time will be in the same format that we supplied to setData.
          // thus it will be YYYY-MM-DD
          const dateStr = param.time;
          toolTip.style.display = "block";
          const dataActual = param.seriesData.get(chartNameActual);
          const dataPredict = param.seriesData.get(chartNamePredict);
          let price;
          if (dataActual !== undefined) {
            price =
              dataActual.value !== undefined
                ? dataActual.value
                : dataActual.close;
            toolTip.innerHTML = `<div style="color: ${"blue"}">BitCoin</div><div style="font-size: 24px; margin: 4px 0px; color: ${"black"}">
			${Math.round(100 * price) / 100}
			</div><div style="color: ${"black"}">
			${dateStr}
			</div>`;
          }

          if (dataPredict !== undefined) {
            price =
              dataPredict.value !== undefined
                ? dataPredict.value
                : dataPredict.close;
            toolTip.innerHTML = `<div style="color: ${"rgba(255, 82, 82, 1)"}">BitCoin</div><div style="font-size: 24px; margin: 4px 0px; color: ${"black"}">
			${Math.round(100 * price) / 100}
			</div><div style="color: ${"black"}">
			${dateStr}
			</div>`;
          }

          const y = param.point.y;
          let left = param.point.x + toolTipMargin;
          if (left > chartContainerRef.current.clientWidth - toolTipWidth) {
            left = param.point.x - toolTipMargin - toolTipWidth;
          }

          let top = y + toolTipMargin;
          if (top > chartContainerRef.current.clientHeight - toolTipHeight) {
            top = y - toolTipHeight - toolTipMargin;
          }
          toolTip.style.left = left + "px";
          toolTip.style.top = top + "px";
        }
      });
    });

    // chart.subscribeCrosshairMove((param) => {
    //   if (param.time) {
    //     const actualData = param.seriesData.get(chartNameActual);
    //     const predictData = param.seriesData.get(chartNamePredict);
    //     // console.log(
    //     //   `Crosshair moved to ${param.point.x}, ${param.point.y}. The time is ${param.time}.`
    //     // );
    //     setActualLinePrice(actualData);
    //     setPredictLinePrice(predictData);
    //   }
    // });

    chart.timeScale().fitContent();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  return (
    <div className="App">
      {/* <Box /> */}
      <div ref={chartContainerRef} style={{ position: "relative" }}>
        {/* <div
          ref={tooltipref}
          style={{
            position: "absolute",
            width: 120,
            height: 90,
            border: "1px solid",
            borderColor: "white",
            zIndex: 1000,
            color: "white",
          }}
        >
          <h3>Senthil</h3>
          <p>{actualLinePrice?.value}</p>
          <p>{currentTime}</p>
        </div> */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 30,
            zIndex: 20,
            color: "black",
          }}
        >
          <div style={{ fontFamily: "Poppins", color: "563D7C", fontSize: '13px' }}>
           {t("landingHeader.coinsymbal")}: {name}
          </div>
          <div style={{ display: "flex" }}>
            {actualLinePrice?.value ? (
              <div
                style={{
                  marginRight: 10,
                  fontFamily: "Poppins",
                  fontSize: '13px',
                  color: "green",
                }}
              >
                {t("landingHeader.actualprice")}: {actualLinePrice?.value}
              </div>
            ) : (
              <div
                style={{ marginRight: 10, fontFamily: "Poppins", color: "red", fontSize: '13px' }}
              >
                {t("landingHeader.predictedprice")}:{predictLinePrice?.value}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoubleLine;
