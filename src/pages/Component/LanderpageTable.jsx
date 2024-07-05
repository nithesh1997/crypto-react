import React, { useState } from "react";
import { Table, Form, Pagination } from "react-bootstrap";
import data from "../../data/sampleCoinData.json";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
const CoinTable = () => {
  const apidata = useSelector((state) => state.tabeldata);
  const { t } = useTranslation();
  const coins = apidata;
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(25);
  const isLoggedIn = useSelector((state) => state.auth);
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const filteredCoins = coins?.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const formatNumber = (number) => {
    const suffixes = ["", "K", "M", "B", "T"];
    let suffixNum = 0;

    while (number >= 1000 && suffixNum < suffixes.length - 1) {
      suffixNum++;
      number /= 1000;
    }
    return `${number?.toFixed(2)} ${suffixes[suffixNum]}`;
  };

  const generateSparklineChart = (data, color) => {
    const options = {
      chart: {
        sparkline: {
          enabled: true,
        },
      },
      series: [
        {
          data: data,
        },
      ],
      colors: [color],
      stroke: {
        curve: "smooth",
        width: 1,
      },
      markers: {
        size: 0,
      },
      tooltip: {
        enabled: false,
      },
      xaxis: {
        labels: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
      grid: {
        show: false,
      },
    };

    return (
      <ReactApexChart
        options={options}
        series={options.series}
        type="line"
        width={100}
        height={35}
      />
    );
  };
  const coininfo = (coin) => {
    navigate("/coindetails", { state: coin });
  };
  return (
    <div className="d-flex flex-column gap-3 mt-4 container-xxl">
      <div className="d-flex flex-column justify-content-center align-items-center w-100 mx-auto">
        <Form.Group className="custom_input_search_box_lander_table_outer_div d-flex justify-content-end align-self-end">
          <Form.Control
            type="text"
            placeholder={t("table.search")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="custom_input_search_box_lander_table"
          />
        </Form.Group>
        <div className="w-100">
          <Table
            striped
            responsive
            hover
            className="table_main_lander_page text-nowrap table-fixed"
          >
            <thead>
              <tr>
                <th className="fixed-column">{t("table.rank")}</th>
                <th className="second-fixed-column">{t("table.name")}</th>
                <th>{t("table.price")}</th>
                <th colSpan="3">
                  <div className="d-flex flex-column">
                    <div className="d-flex align-items-center justify-content-center font-weight-bold">
                      {!isLoggedIn ? t("table.changes") : t("table.actual")}
                    </div>
                    <div className="d-flex justify-content-around">
                      <div className="text-center d-flex justify-content-center align-items-center">
                        {t("table.1hr")}
                      </div>
                      <div className="text-center d-flex justify-content-center align-items-center">
                        {t("table.24hr")}
                      </div>
                      <div className="text-center d-flex justify-content-center align-items-center">
                        {t("table.7d")}
                      </div>
                    </div>
                  </div>
                </th>
                {isLoggedIn && (
                  <th colSpan="3">
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center justify-content-center font-weight-bold">
                        {t("table.Predicted")}
                      </div>
                      <div className="d-flex justify-content-around">
                        <div className="text-center d-flex justify-content-center align-items-center">
                          {t("table.1hr")}
                        </div>
                        <div className="text-center d-flex justify-content-center align-items-center">
                          {t("table.24hr")}
                        </div>
                        <div className="text-center d-flex justify-content-center align-items-center">
                          {t("table.7d")}
                        </div>
                      </div>
                    </div>
                  </th>
                )}
                <th>{t("table.marketcap")}</th>
                <th>{t("table.last_seven_days")}</th>
              </tr>
            </thead>
            {!isLoggedIn && (
              <tbody>
                {filteredCoins &&
                  filteredCoins
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((coin) => (
                      <tr key={coin?.market_cap_rank}>
                        <td className="fixed-column">
                          {coin?.market_cap_rank}
                        </td>
                        <td className="second-fixed-column">
                          {
                            <img
                              src={`${coin?.image}`}
                              alt="Bitcoin Logo"
                              style={{ marginRight: "10px" }}
                              width={20}
                            />
                          }
                          {coin.name}
                        </td>

                        <td>${coin.current_price}</td>

                        <td
                          style={{
                            color:
                              coin?.price_change_percentage_1h_in_currency > 0
                                ? "green"
                                : "red",
                          }}
                        >
                          <i
                            className={
                              coin?.price_change_percentage_1h_in_currency > 0
                                ? "bi bi-caret-up-fill"
                                : "bi bi-caret-down-fill"
                            }
                          ></i>
                          {parseFloat(
                            coin?.price_change_percentage_1h_in_currency.toFixed(
                              2
                            )
                          )}
                          %
                        </td>
                        <td
                          style={{
                            color:
                              coin?.price_change_percentage_24h_in_currency > 0
                                ? "green"
                                : "red",
                          }}
                        >
                          <i
                            className={
                              coin?.price_change_percentage_24h_in_currency > 0
                                ? "bi bi-caret-up-fill"
                                : "bi bi-caret-down-fill"
                            }
                          ></i>
                          {parseFloat(
                            coin?.price_change_percentage_24h_in_currency.toFixed(
                              2
                            )
                          )}{" "}
                          %
                        </td>
                        <td
                          style={{
                            color:
                              coin?.price_change_percentage_7d_in_currency > 0
                                ? "green"
                                : "red",
                          }}
                        >
                          <i
                            className={
                              coin?.price_change_percentage_7d_in_currency > 0
                                ? "bi bi-caret-up-fill"
                                : "bi bi-caret-down-fill"
                            }
                          ></i>
                          {parseFloat(
                            coin?.price_change_percentage_7d_in_currency?.toFixed(
                              2
                            )
                          )}
                          %
                        </td>
                        <td>${formatNumber(coin.market_cap)}</td>
                        <td>
                          {generateSparklineChart(
                            coin?.sparkline_in_7d?.price,
                            coin?.price_change_percentage_1h_in_currency > 0
                              ? "#008000"
                              : "#ff0000"
                          )}
                        </td>
                      </tr>
                    ))}
              </tbody>
            )}
            {isLoggedIn && (
              <tbody>
                {filteredCoins &&
                  filteredCoins
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((coin) => (
                      <tr
                        onClick={() => coininfo(coin)}
                        key={coin?.market_cap_rank}
                        style={{ cursor: "pointer" }}
                      >
                        <td className="fixed-column">
                          {coin?.market_cap_rank}
                        </td>
                        <td className="second-fixed-column">
                          {
                            <img
                              src={`${coin?.image}`}
                              alt="Bitcoin Logo"
                              style={{ marginRight: "10px" }}
                              width={20}
                            />
                          }
                          {coin.name}
                        </td>

                        <td>${coin.current_price}</td>

                        <td
                          style={{
                            color:
                              coin?.price_change_percentage_1h_in_currency > 0
                                ? "green"
                                : "red",
                          }}
                        >
                          <i
                            className={
                              coin?.price_change_percentage_1h_in_currency > 0
                                ? "bi bi-caret-up-fill"
                                : "bi bi-caret-down-fill"
                            }
                          ></i>
                          {parseFloat(
                            coin?.price_change_percentage_1h_in_currency.toFixed(
                              2
                            )
                          )}
                          %
                        </td>
                        <td
                          style={{
                            color:
                              coin?.price_change_percentage_24h_in_currency > 0
                                ? "green"
                                : "red",
                          }}
                        >
                          <i
                            className={
                              coin?.price_change_percentage_24h_in_currency > 0
                                ? "bi bi-caret-up-fill"
                                : "bi bi-caret-down-fill"
                            }
                          ></i>
                          {parseFloat(
                            coin?.price_change_percentage_24h_in_currency.toFixed(
                              2
                            )
                          )}{" "}
                          %
                        </td>
                        <td
                          style={{
                            color:
                              coin?.price_change_percentage_7d_in_currency > 0
                                ? "green"
                                : "red",
                          }}
                        >
                          <i
                            className={
                              coin?.price_change_percentage_7d_in_currency > 0
                                ? "bi bi-caret-up-fill"
                                : "bi bi-caret-down-fill"
                            }
                          ></i>
                          {parseFloat(
                            coin?.price_change_percentage_7d_in_currency.toFixed(
                              2
                            )
                          )}
                          %
                        </td>
                        <td
                          style={{
                            color:
                              coin?.price_change_percentage_1h_in_currency > 0
                                ? "green"
                                : "red",
                          }}
                        >
                          <i
                            className={
                              coin?.price_change_percentage_1h_in_currency > 0
                                ? "bi bi-caret-up-fill"
                                : "bi bi-caret-down-fill"
                            }
                          ></i>
                          {parseFloat(
                            coin?.price_change_percentage_1h_in_currency.toFixed(
                              2
                            )
                          )}
                          %
                        </td>
                        <td
                          style={{
                            color:
                              coin?.price_change_percentage_24h_in_currency > 0
                                ? "green"
                                : "red",
                          }}
                        >
                          <i
                            className={
                              coin?.price_change_percentage_24h_in_currency > 0
                                ? "bi bi-caret-up-fill"
                                : "bi bi-caret-down-fill"
                            }
                          ></i>
                          {parseFloat(
                            coin?.price_change_percentage_24h_in_currency.toFixed(
                              2
                            )
                          )}{" "}
                          %
                        </td>
                        <td
                          style={{
                            color:
                              coin?.price_change_percentage_7d_in_currency > 0
                                ? "green"
                                : "red",
                          }}
                        >
                          <i
                            className={
                              coin?.price_change_percentage_7d_in_currency > 0
                                ? "bi bi-caret-up-fill"
                                : "bi bi-caret-down-fill"
                            }
                          ></i>
                          {parseFloat(
                            coin?.price_change_percentage_7d_in_currency.toFixed(
                              2
                            )
                          )}
                          %
                        </td>
                        <td>${formatNumber(coin.market_cap)}</td>
                        <td>
                          {generateSparklineChart(
                            coin?.sparkline_in_7d?.price,
                            coin?.price_change_percentage_1h_in_currency > 0
                              ? "#008000"
                              : "#ff0000"
                          )}
                        </td>
                      </tr>
                    ))}
              </tbody>
            )}
          </Table>
        </div>
      </div>
      <Pagination className="justify-content-center">
        {Array.from(
          { length: Math.ceil(filteredCoins?.length / rowsPerPage) },
          (_, i) => (
            <Pagination.Item
              key={i}
              active={i === page}
              onClick={() => handleChangePage(i)}
            >
              {i + 1}
            </Pagination.Item>
          )
        )}
      </Pagination>
    </div>
  );
};

export default CoinTable;
// import React, { Component, useState, useEffect } from "react";
// import { ListGroup } from "react-bootstrap";
// import cData from "../../data/sampleCoinData.json";
// import { useNavigate } from "react-router-dom";
// import Pagination from "react-bootstrap/Pagination";
// import { useTranslation } from 'react-i18next';

// const Home = () => {
//     const {t}=useTranslation();
//     const navigate = useNavigate();
//     const [data, setData] = useState([]);
//     const [limit, setLimit] = useState(25);

//     const sampleData = cData["data"]["coins"];
//     const numPage = 10;
//     const [curr, set_Curr] = useState(1);

//     const totalDataLength = (count) => {
//         return count > limit ? getDividedLength(count) : 1;
//     }

//     const getDividedLength = (count) => {
//         let totalCount = 1;
//         const quotient = Math.floor(count / limit);
//         const reminder = count % limit;
//         totalCount = reminder === 0 ? quotient : quotient + 1;
//         return totalCount;
//     }

//     const maxLimit = totalDataLength(sampleData.length);

//     const handleClick = (coin) => {
//         console.log(JSON.stringify(coin));
//         navigate("/coindetails", { state: coin });
//     }

//     const getCoinPrice = (coin) => {
//         return "$" + parseFloat(coin).toFixed(3);
//     };

//     useEffect(() => {
//         loadCoinData(0);
//     }, []);

//     const loadCoinData = (page) => {
//         let temp = [];
//         let inital = limit * page
//         let count = inital + limit;
//         sampleData.map((itm, idx) => {
//             if (idx === inital && idx < count) {
//                 temp.push(itm);
//                 inital = inital + 1;
//             }
//         });
//         setData(temp);
//     }

//     const pageChangeFunction = (p) => {
//         if (p >= 1 && p <= maxLimit) {
//             set_Curr(p);
//             setData([]);
//             loadCoinData(p);
//         }
//     };

//     const getCoinList=(e)=>{

//         const vl = e.target.value?.toLocaleLowerCase();
//         if(vl.length >= 3){
//             const filterdata = sampleData.filter(function (el) { return el.name?.toLocaleLowerCase().includes(vl) });

//             setData(filterdata);
//             showPageItemsFunction();
//         }
//         else if(vl.length === 0){
//             loadCoinData(0)
//         }
//     }

//     const showPageItemsFunction = () => {
//         const data = [];
//         if (maxLimit <= numPage) {
//             for (let i = 1; i < maxLimit; i++) {
//                 data.push(
//                     <Pagination.Item
//                         key={i}
//                         active={i === curr}
//                         onClick={() => pageChangeFunction(i)}
//                     >
//                         {i}
//                     </Pagination.Item>
//                 );
//             }
//         } else {
//             const leftside = curr - numPage / 2 > 1;
//             const rightside = curr + numPage / 2 < maxLimit;
//             data.push(
//                 <Pagination.First
//                     key="first"
//                     onClick={() => pageChangeFunction(1)}
//                 />
//             );
//             data.push(
//                 <Pagination.Prev
//                     key="prev"
//                     onClick={() => pageChangeFunction(curr - 1)}
//                 />
//             );
//             if (leftside) {
//                 data.push(<Pagination.Ellipsis key="leftEllipsis" />);
//             }
//             const str = Math.max(1, Math.round(curr - numPage / 2));
//             const end = Math.min(maxLimit, Math.round(curr + numPage / 2));
//             for (let i = str; i <= end; i++) {
//                 data.push(
//                     <Pagination.Item
//                         key={i}
//                         active={i === curr}
//                         onClick={() => pageChangeFunction(i)}
//                     >
//                         {i}
//                     </Pagination.Item>
//                 );
//             }
//             if (rightside) {
//                 data.push(<Pagination.Ellipsis key="rightEllipsis" />);
//             }
//             data.push(
//                 <Pagination.Next
//                     key="next"
//                     onClick={() => pageChangeFunction(curr + 1)}
//                 />
//             );
//             data.push(
//                 <Pagination.Last
//                     key="last"
//                     onClick={() => pageChangeFunction(maxLimit)}
//                 />
//             );
//         }
//         return data;
//     };

//     return (
//         <div >

//             <div style={{margin:"20px"}} >
//                 <div style={{ width: '30%', marginLeft: 'auto', marginRight: '0' }}>
//                     <div class="form-group has-search">
//                         <span class="bi bi-search form-control-feedback"></span>
//                         <input type="text" class="form-control" placeholder={t('landingHeader.cryptos')}  onChange={getCoinList} />
//                     </div>
//                 </div>
//             </div>
//             <div id="home" className="lyt">

//                 <div className="container" style={{ fontSize: '14px', borderBottom: '0px solid #e9e9eb', borderRadius: '10px', padding: '10px' }}>

//                     <div className="row p-1" style={{ borderBottom: '1px solid #f3f3f4', margin: '10px 2px 0 2px' }}>
//                         <div className="col d-flex">
//                             <div style={{ marginRight: '30px' }}></div>
//                             <div className="col" style={{ fontWeight: 500, }}>Name</div>
//                         </div>
//                         <div className="col" style={{ fontWeight: 500 }}>MarketCap</div>
//                         <div className="col">
//                             <div style={{ marginLeft: '32%', fontWeight: 500 }}>Past</div>
//                             <div className="col d-flex" style={{ marginTop: '5px' }}>
//                                 <div className="col" style={{ fontWeight: 500, fontSize: '13px' }}> 30m </div>
//                                 <div className="col" style={{ fontWeight: 500, fontSize: '13px' }}> 1h </div>
//                                 <div className="col" style={{ fontWeight: 500, fontSize: '13px' }}> 24h </div>
//                             </div>
//                         </div>

//                         <div className="col" style={{ fontWeight: 500 }}>Price</div>
//                     </div>

//                     <div style={{ margin: '10px 0px' }}>
//                         {data.map((coin, index) => (
//                             <div
//                                 className="row p-2 mt-1 sgl"
//                                 style={{ borderBottom: "1px solid #f6f6f7", margin: '0 2px' }}
//                                 key={coin.uuid}

//                                 onClick={() => alert("login for more details")}
//                             >
//                                 <div className="col d-flex">
//                                     <div style={{ marginRight: '20px', fontSize: '13px' }}>{coin.rank}</div>
//                                     <img className="img" style={{ width: '20px', height: '20px' }} src={coin.iconUrl} alt="" />
//                                     <div style={{ margin: '0 10px' }}>{coin.name}</div>
//                                 </div>
//                                 <div className="col">
//                                     <div style={{ margin: '0 0px', fontSize: '13px' }}>{getCoinPrice(coin.marketCap)}</div>

//                                 </div>
//                                 <div className="col d-flex">
//                                     <div className="col" style={{ fontSize: '13px' }}> {coin.change} </div>
//                                     <div className="col" style={{ fontSize: '13px' }}>{coin.change}</div>
//                                     <div className="col" style={{ fontSize: '13px' }}>{coin.change}</div>
//                                 </div>

//                                 <div className="col">
//                                     <div style={{ margin: '0 0px', color: coin.color, fontSize: '13px' }}>{getCoinPrice(coin.price)}</div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <div style={{ display: "flex", justifyContent: "right", marginTop: '20px', marginRight: '20px' }}>
//                     <Pagination>{showPageItemsFunction()}</Pagination>
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default Home;
