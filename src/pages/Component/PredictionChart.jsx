import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const PredictionChart = ({ coinData }) => {
  // Format data for ApexCharts
  // const seriesData = [
  //   {
  //     name: "Actual",
  //     data: coinData.data[0].actual.map((item) => [
  //       new Date(item.time * 1000).toISOString(),
  //       item.value,
  //     ]),
  //     line: {
  //       dashArray: 10,
  //     },
  //   },
  //   {
  //     name: "Predicted",
  //     data: coinData.data[0].predict.map((item) => [
  //       new Date(item.time * 1000).toISOString(),
  //       item.value,
  //     ]),
  //   },
  // ];

  const options = {
    chart: {
      type: "area",
      height: 350,
      stacked: false,
      toolbar: {
        show: true,
        offsetX: -10,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
    },
    colors: ["#008FFB", "#00E396"],
    legend: {
      position: "top",
      offsetY: 0,
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy HH:mm:ss",
      },
    },
    fill: {
      gradient: {
        opacityFrom: 0.5,
        opacityTo: 0.3,
      },
    },
    annotations: {
      yaxis: [
        {
          y: coinData.data[0].actual[coinData.data[0].actual.length - 1].value,
          borderColor: "#008FFB",
          label: {
            borderColor: "#008FFB",
            style: {
              color: "#fff",
              background: "#008FFB",
            },
            text:
              "Actual: " +
              coinData.data[0].actual[
                coinData.data[0].actual.length - 1
              ].value.toFixed(2),
          },
        },
        {
          y: coinData.data[0].predict[coinData.data[0].predict.length - 1]
            .value,
          borderColor: "#00E396",
          label: {
            borderColor: "#00E396",
            style: {
              color: "#fff",
              background: "#00E396",
            },
            text:
              "Predicted: " +
              coinData.data[0].predict[
                coinData.data[0].predict.length - 1
              ].value.toFixed(2),
          },
        },
      ],
    },
    stroke: {
      dashArray: [0, 5],
    },
    series: [
      {
        name: "Actual",
        data: coinData.data[0].actual.map((item) => [
          new Date(item.time * 1000).toISOString(),
          item.value,
        ]),
      },
      {
        name: "Predicted",
        data: coinData.data[0].predict.map((item) => [
          new Date(item.time * 1000).toISOString(),
          item.value,
        ]),
      },
    ],
  };
  // const [selection, setSelection] = useState("all");
  // const [series, setSeries] = useState(seriesData);

  // const handleRangeChange = (value) => {
  //   setSelection(value);

  //   switch (value) {
  //     case "one_month":
  //       const oneMonthData = filterDataForLastMonth(coinData);
  //       updateChart(oneMonthData);
  //       break;
  //     case "six_months":
  //       const sixMonthsData = filterDataForLastSixMonths(coinData);
  //       updateChart(sixMonthsData);
  //       break;
  //     case "one_year":
  //       // Filter data for the last one year
  //       const oneYearData = filterDataForLastYear(coinData);
  //       updateChart(oneYearData);
  //       break;
  //     case "ytd":
  //       // Filter data for year-to-date
  //       const ytdData = filterDataForYearToDate(coinData);
  //       updateChart(ytdData);
  //       break;
  //     case "all":
  //       updateChart(coinData.data[0]);
  //       break;
  //     default:
  //       break;
  //   }
  // };
  // const updateChart = (datas) => {
  //   console.log(datas, "datassss");
  //   const updatedSeries = [
  //     {
  //       name: "Actual",
  //       data: datas.actual.map((item) => [
  //         new Date(item.time * 1000).toISOString(),
  //         item.value,
  //       ]),
  //     },
  //     {
  //       name: "Predicted",
  //       data: datas.predict.map((item) => [
  //         new Date(item.time * 1000).toISOString(),
  //         item.value,
  //       ]),
  //     },
  //   ];
  //   setSeries(updatedSeries);
  // };
  // const filterDataForLastMonth = (coinData) => {
  //   const currentDate = new Date();
  //   const oneMonthAgo = new Date(currentDate);
  //   oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  //   const filteredData = {
  //     actual: coinData.data[0].actual.filter(
  //       (entry) => new Date(entry.time * 1000) >= oneMonthAgo
  //     ),
  //     predict: coinData.data[0].predict.filter(
  //       (entry) => new Date(entry.time * 1000) >= oneMonthAgo
  //     ),
  //   };

  //   return filteredData;
  // };

  // const filterDataForLastSixMonths = (coinData) => {
  //   const currentDate = new Date();
  //   const sixMonthsAgo = new Date(currentDate);
  //   sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  //   const filteredData = {
  //     actual: coinData.data[0].actual.filter(
  //       (entry) => new Date(entry.time * 1000) >= sixMonthsAgo
  //     ),
  //     predict: coinData.data[0].predict.filter(
  //       (entry) => new Date(entry.time * 1000) >= sixMonthsAgo
  //     ),
  //   };

  //   return filteredData;
  // };

  // const filterDataForLastYear = (coinData) => {
  //   const currentDate = new Date();
  //   const oneYearAgo = new Date(currentDate);
  //   oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  //   const filteredData = {
  //     actual: coinData.data[0].actual.filter(
  //       (entry) => new Date(entry.time * 1000) >= oneYearAgo
  //     ),
  //     predict: coinData.data[0].predict.filter(
  //       (entry) => new Date(entry.time * 1000) >= oneYearAgo
  //     ),
  //   };

  //   return filteredData;
  // };

  // const filterDataForYearToDate = (coinData) => {
  //   const currentDate = new Date();
  //   const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
  //   const filteredData = {
  //     actual: coinData.data[0].actual.filter(
  //       (entry) => new Date(entry.time * 1000) >= startOfYear
  //     ),
  //     predict: coinData.data[0].predict.filter(
  //       (entry) => new Date(entry.time * 1000) >= startOfYear
  //     ),
  //   };

  //   return filteredData;
  // };

  return (
    <div>
      <div id="chart">
        {/* <div className="toolbar">
          <button
            id="one_month"
            onClick={() => handleRangeChange("one_month")}
            className={selection === "one_month" ? "active" : ""}
          >
            1M
          </button>

          <button
            id="six_months"
            onClick={() => handleRangeChange("six_months")}
            className={selection === "six_months" ? "active" : ""}
          >
            6M
          </button>

          <button
            id="one_year"
            onClick={() => handleRangeChange("one_year")}
            className={selection === "one_year" ? "active" : ""}
          >
            1Y
          </button>

          <button
            id="ytd"
            onClick={() => handleRangeChange("ytd")}
            className={selection === "ytd" ? "active" : ""}
          >
            YTD
          </button>

          <button
            id="all"
            onClick={() => handleRangeChange("all")}
            className={selection === "all" ? "active" : ""}
          >
            ALL
          </button>
        </div> */}

        <div id="chart-timeline">
          <ReactApexChart
            options={options}
            series={options.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default PredictionChart;
