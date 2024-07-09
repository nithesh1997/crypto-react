import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  ColorType,
  createChart,
  LineStyle,
  CrosshairMode,
} from "lightweight-charts";
import { Container, Row, Col } from "react-bootstrap";

const SingleLine = () => {

  const chartContainerRef = useRef();
  let chart;
  let newSeries;
  const initialData = [
    { time: 1529899200, value: 10.3 },
    { time: 1706253215, value: 11.99 },
    { time: 1706253230, value: 12.31 },
    { time: 1706253245, value: 13.99 },
    { time: 1706253260, value: 14.3 },
    { time: 1706253275, value: 15.99 },
    { time: 1706253290, value: 16.31 },
    { time: 1706253305, value: 17.99 },
    { time: 1706253320, value: 18.99 },
    { time: 1706253335, value: 19.3 },
    { time: 1706253350, value: 20.99 },
    { time: 1706253365, value: 21.31 },
    { time: 1706253380, value: 22.99 },
    { time: 1706253395, value: 23.3 },
    { time: 1706253410, value: 24.99 },
  ];

  const handleResize = () => {
    chart.applyOptions({ width: chartContainerRef.current.clientWidth });
  };

  useEffect(() => {
    // const initialData = [
    //   { value: 1, time: 1642425322 },
    //   { value: 8, time: 1642511722 },
    //   { value: 10, time: 1642598122 },
    //   { value: 20, time: 1642684522 },
    //   { value: 3, time: 1642770922 },
    //   { value: 43, time: 1642857322 },
    //   { value: 41, time: 1642943722 },
    //   { value: 43, time: 1643030122 },
    //   { value: 56, time: 1643116522 },
    //   { value: 46, time: 1643202922 },
    // ];

    chart = createChart(chartContainerRef.current, {
      layout: {
        fontFamily: "GilmerMedium",
        fontSize: 12,
        textColor: "#727FA4",
        background: { type: ColorType.Solid, color: "white" },
      },
      timeScale: {
        timeVisible: true,
        borderVisible: false,
      },
      localization: {
        timeFormatter: (businessDayOrTimestamp) => {
          return Date(businessDayOrTimestamp);
        },
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
      width: chartContainerRef.current.width,
      height: 220,
    });
  
    newSeries = chart.addBaselineSeries({
      baseValue: { type: "price", price: 18 },
      topLineColor: "rgba( 38, 166, 154, 1)",
      topFillColor1: "rgba( 38, 166, 154, 0.28)",
      topFillColor2: "rgba( 38, 166, 154, 0.05)",
      bottomLineColor: "rgba( 239, 83, 80, 1)",
      bottomFillColor1: "rgba( 239, 83, 80, 0.05)",
      bottomFillColor2: "rgba( 239, 83, 80, 0.28)",
    });

    newSeries.setData(initialData);

    chart.timeScale().fitContent();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  return (
    <div className="App">
        <div ref={chartContainerRef}></div>
    </div>
  );
};
export default SingleLine;
