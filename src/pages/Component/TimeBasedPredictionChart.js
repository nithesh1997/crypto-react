// import React, { useState, useEffect } from "react";
// import ReactApexChart from "react-apexcharts";
// const TimeBasedPredictionChart = ({ coinData }) => {
//   const coinInvervalData = coinData.data;
//   const [selectedIntervals, setSelectedIntervals] = useState([]);

//   const toggleInterval = (interval) => {
//     if (selectedIntervals.includes(interval)) {
//       setSelectedIntervals(
//         selectedIntervals.filter((item) => item !== interval)
//       );
//     } else {
//       setSelectedIntervals([...selectedIntervals, interval]);
//     }
//   };

//   const options = {
//     chart: {
//       id: "bitcoin-chart",
//     },
//     xaxis: {
//       type: "datetime",
//     },
//     yaxis: {
//       title: {
//         text: "Bitcoin Value",
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     stroke: {
//       width: 2,
//     },
//   };

//   const series = Object.entries(coinInvervalData)
//     .map(([interval, { actual, predict }]) => {
//       const seriesData = [...actual];

//       if (selectedIntervals.includes(interval)) {
//         console.log(`Processing ${interval} predict data`);
//         console.log(`Predict data for ${interval}:`, predict);
//         predict.forEach(({ time, value }) => {
//           console.log(`Adding predict data for ${interval}:`, time, value);
//           seriesData.push({ x: time * 1000, y: value });
//         });
//       }

//       console.log(`Series data for ${interval}:`, seriesData);

//       return {
//         name: interval,
//         data: seriesData.sort((a, b) => a.x - b.x),
//       };
//     })
//     .filter(({ data }) => data.length > 0);

//   console.log("Final series data:", series);
//   useEffect(() => {
//     // Ensure 0min actual data is always included in the initial series data
//     setSelectedIntervals(["0min"]);
//   }, []);
//   return (
//     <div>
//       <div>
//         <button onClick={() => toggleInterval("15min")}>15min</button>
//         <button onClick={() => toggleInterval("30min")}>30min</button>
//         <button onClick={() => toggleInterval("60min")}>60min</button>
//       </div>
//       <ReactApexChart
//         options={options}
//         series={series}
//         type="area"
//         height={400}
//       />
//     </div>
//   );
// };

// export default TimeBasedPredictionChart;
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import "bootstrap/dist/css/bootstrap.min.css";

function TimeBasedPredictionChart({ coinData }) {
  const [activeButtons, setActiveButtons] = useState([]);

  const handleButtonClick = (buttonName) => {
    setActiveButtons((prevButtons) =>
      prevButtons.includes(buttonName)
        ? prevButtons.filter((btn) => btn !== buttonName)
        : [...prevButtons, buttonName]
    );
  };

  const getPredictSeries = (interval) => {
    const predictData = coinData.data[interval]?.predict;
    if (predictData) {
      return predictData.map((item) => [
        new Date(item.time * 1000).toISOString(),
        item.value,
      ]);
    } else {
      return [];
    }
  };

  const actualSeries = {
    name: "Actual",
    data: coinData.data["0"].actual.map((item) => [
      new Date(item.time * 1000).toISOString(),
      item.value,
    ]),
  };

  const activeSeries = activeButtons.map((button) => ({
    name:
      button == "15"
        ? "15sec"
        : button == "30"
        ? "30sec"
        : button == "60"
        ? "1min"
        : "",
    data: getPredictSeries(button),
  }));

  const seriesData = [actualSeries, ...activeSeries];

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
    colors: ["#008FFB", "#00E396", "#c000ff", "#ffc000"],
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
    stroke: {
      dashArray: [0, 5, 5, 5],
    },
  };

  useEffect(() => {
    const activeButtonsWithData = activeButtons.filter(
      (button) => getPredictSeries(button)?.length > 0
    );
    setActiveButtons(activeButtonsWithData);
  }, [coinData]);

  return (
    <div>
      <div
        className="btn-group btn-group-sm"
        role="group"
        aria-label="Button group"
      >
        <button
          type="button"
          className={`btn btn-sm  ${
            activeButtons.includes("15") ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => handleButtonClick("15")}
        >
          15sec
        </button>
        <button
          type="button"
          className={`btn btn-sm ${
            activeButtons.includes("30") ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => handleButtonClick("30")}
        >
          30sec
        </button>
        <button
          type="button"
          className={`btn btn-sm ${
            activeButtons.includes("60") ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => handleButtonClick("60")}
        >
          1min
        </button>
      </div>
      {seriesData && seriesData.length > 0 && (
        <ReactApexChart
          options={options}
          series={seriesData.filter((series) => series.data.length > 0)}
          type="area"
          height={350}
        />
      )}
    </div>
  );
}

export default TimeBasedPredictionChart;
