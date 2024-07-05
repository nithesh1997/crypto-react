import Carousel from "react-bootstrap/Carousel";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function DarkVariantExample() {
  const trendingcoin = useSelector((state) => state.carsoul1);
  const icosdata = useSelector((state) => state.headerdata?.data);
  const top = useSelector((state) => state.tabeldata);

  const [cgainto_dolortrillion, setcgainto_dolortrillion] = useState({});

  const indicatorLabels = ["e", "Second Slide", "Third Slide"];
  const { t } = useTranslation();
  useEffect(() => {
    if (trendingcoin != null && trendingcoin.length) {
      setcgainto_dolortrillion({
        a: (
          parseFloat(
            trendingcoin[0]?.item.data.market_cap?.replace(/\$|,/g, "")
          ) / 1e12
        ).toFixed(5),
        b: (
          parseFloat(
            trendingcoin[1]?.item.data.market_cap?.replace(/\$|,/g, "")
          ) / 1e12
        ).toFixed(5),
        c: (
          parseFloat(
            trendingcoin[2]?.item.data.market_cap?.replace(/\$|,/g, "")
          ) / 1e12
        ).toFixed(5),
        d: (
          parseFloat(
            trendingcoin[3]?.item.data.market_cap?.replace(/\$|,/g, "")
          ) / 1e12
        ).toFixed(5),
        e: (
          parseFloat(
            trendingcoin[4]?.item.data.market_cap?.replace(/\$|,/g, "")
          ) / 1e12
        ).toFixed(5),
        f: (
          parseFloat(
            trendingcoin[5]?.item.data.market_cap?.replace(/\$|,/g, "")
          ) / 1e12
        ).toFixed(5),
      });
    }
  }, [trendingcoin]);

  return (
    <div className="h-100">
      {top && (
        <Carousel
          controls={false}
          indicators={true}
          indicatorLabels={indicatorLabels}
          data-bs-theme="dark"
          className="main_carousel"
        >
          {/* <Carousel.Item className='carousel_in_main' >


        <div className='h-100 d-flex flex-column justify-content-center p-3'>
          <div>
            <h6 style={{ color: 'black' }}> <i class="bi bi-fire" style={{ color: "red", }} ></i>{" "}{t('carsoul.trending')}</h6>
          </div>
          <div>
            <Table variant='light'>
              <thead>

                <th>Name</th>
                <th>CAP</th>
              </thead>
              <tbody>
                <tr>

                  <td>{trendingcoin && trendingcoin[0]?.item.name}</td>

                  <td>${cgainto_dolortrillion.a}T</td>
                </tr>
                <tr>

                  <td>{trendingcoin && trendingcoin[1]?.item.name}</td>
                  <td style={{ color: "green" }}>${cgainto_dolortrillion.b}T</td>
                </tr>
                <tr>

                  <td>{trendingcoin && trendingcoin[2]?.item.name}</td>
                  <td style={{ color: "blue" }}>$ {cgainto_dolortrillion.c}T</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>


      </Carousel.Item> */}
          <Carousel.Item className="carousel_in_main">
            <div className="h-100 d-flex flex-column justify-content-center p-3">
              <div>
                <h6 style={{ color: "black" }}>
                  {" "}
                  <i
                    class="bi bi-arrow-up-circle-fill"
                    style={{ color: "green" }}
                  ></i>{" "}
                  {t("carsoul.top")}
                </h6>
              </div>
              <div>
                <Table variant="light">
                  <thead>
                    <th>Name</th>
                    <th>Price</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <img src={top[0].image} width={20} />{" "}
                        {top && top[0].name}
                      </td>

                      <td>${top && top[0].current_price}</td>
                    </tr>
                    <tr>
                      <td>
                        <img src={top[1].image} width={20} />{" "}
                        {top && top[1].name}
                      </td>

                      <td>${top && top[1].current_price}</td>
                    </tr>
                    <tr>
                      <td>
                        <img src={top[2].image} width={20} />{" "}
                        {top && top[2].name}
                      </td>

                      <td>${top && top[2].current_price}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item className="carousel_in_main">
            <div
              className="h-100 d-flex flex-column justify-content-center"
              style={{ padding: "28px" }}
            >
              <div>
                <h6
                  style={{ color: "black", marginTop: "2px" }}
                  // title="ICOs are another form of cryptocurrency that businesses use in order to raise capital. Through ICO trading platforms, investors receive unique cryptocurrency “tokens” in exchange for their monetary investment in the business."
                >
                  {" "}
                  {t("carsoul.ico")}
                </h6>
              </div>
              <div>
                <Table variant="light">
                  <tbody>
                    <tr>
                      <td>{t("carsoul.upcoicos")}</td>
                      <td style={{ color: "red" }}>
                        {icosdata?.upcoming_icos}
                      </td>
                    </tr>
                    <tr>
                      <td>{t("carsoul.ongoingicos")}</td>
                      <td style={{ color: "green" }}>
                        {icosdata?.ongoing_icos}
                      </td>
                    </tr>
                    <tr>
                      <td>{t("carsoul.enicos")}</td>
                      <td style={{ color: "blue" }}>{icosdata?.ended_icos}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      )}
    </div>
  );
}

export default DarkVariantExample;
