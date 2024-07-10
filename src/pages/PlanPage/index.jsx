import React, { useState, useEffect } from "react";
import img from "../../assets/logo2.png";
// import i18n from "../../Helper/i18next";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
function Planpage() {
  const lang = useSelector((state) => state.language.currentLanguage);
  const auth = useSelector((state) => state.language.auth);
  const { t } = useTranslation();
  const [period, setPeriod] = useState(false);
  const navigate = useNavigate();
  // useEffect(() => {
  //   i18n.changeLanguage(lang);
  //   console.log(auth);
  // }, []);
  const handleClick = () => {
    if (auth) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="h-100">
      <h2
        className="d-flex main_color justify-content-center align-items-center w-100 "
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          fontWeight: "bolder",
          fontSize: "xx-large",
        }}
      >
        <img style={{ marginRight: "10px" }} src={img} alt="ii" height={35} />
        {t("ribbon.brand")}
      </h2>
      <div className="w-100 d-flex justify-content-center align-items-center  gap-2">
        <div>{t("plan_page.month")}</div>
        <div className="form-check form-switch d-flex justify-content-center align-items-center">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            defaultChecked={period}
            onChange={() => setPeriod(!period)}
          />
        </div>
        <div>{t("plan_page.annualy")}</div>
      </div>
      <div className="w-100 main_price container mt-3">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-12 mb-5">
            <div className="pricing-box h-100 rounded-4 overflow-hidden">
              <div className="text-center bg-secondary price_heading d-flex justify-content-center align-items-center">
                Enterprise Plan
              </div>
              <div className="p-3 content_in_box_price">
                <div>
                  <p className="text-center mb-1 fw-bold">Free</p>
                </div>
                <div className="d-flex justify-content-center p-2">
                  <button
                    onClick={handleClick}
                    className="btn btn-secondary btn-sm "
                  >
                    Continue
                  </button>
                </div>
                <ul className="price_ofersx mt-3">
                  <li>{t("plan_page.plan1.a_T_ctp_an")}</li>
                  <li>{t("plan_page.plan1.a_PFfor_")}</li>
                  <li>{t("plan_page.plan1.acce_14_hist")}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className=" col-lg-3 col-md-6 col-sm-12 mb-5">
            <div className="pricing-box h-100 rounded-4 overflow-hidden">
              <div className="text-center bg-secondary  price_heading d-flex justify-content-center align-items-center">
                Enterprise Plan
              </div>
              <div className="p-3 content_in_box_price">
                <div className="d-flex flex-column justify-content-center align-items-center w-100">
                  {period ? (
                    <div>
                      <p className="text-center mb-1 fw-bold">
                        {t("plan_page.plan2.y_1_2_m_f")}
                      </p>
                      <p style={{ fontSize: "10px" }} className="fw-bold">
                        {t("plan_page.plan2.y_w_1_d")}
                      </p>
                    </div>
                  ) : (
                    <p className="text-center mb-1 fw-bolder">
                      {t("plan_page.plan2.m_15")}
                    </p>
                  )}
                </div>
                <div className="d-flex justify-content-center p-2">
                  <button
                    onClick={handleClick}
                    className="btn btn-secondary btn-sm "
                  >
                    Continue
                  </button>
                </div>
                <ul className="price_ofersx mt-3">
                  <li>{t("plan_page.plan2.n_ad")}</li>
                  <li>{t("plan_page.plan2.e_e_c_a_t_c")}</li>
                  <li>{t("plan_page.plan2.a_t_c_a")}</li>
                  <li>{t("plan_page.plan2.a_t_p_f_t_n_1_m")}</li>
                  <li>{t("plan_page.plan2.a_t__his")}</li>
                  <li>{t("plan_page.plan2.o_f_p_a_s")}</li>
                  <li>{t("plan_page.plan2.l_c_w_a_a")}</li>
                  <li>{t("plan_page.plan2.o_d_a_t_a")}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className=" col-lg-3 col-md-6 col-sm-12 mb-5">
            <div className="pricing-box h-100 rounded-4 overflow-hidden">
              <div className="text-center bg-secondary price_heading d-flex justify-content-center align-items-center">
                Enterprise Plan
              </div>
              <div className="p-3 content_in_box_price">
                <div className="d-flex flex-column justify-content-center align-items-center w-100">
                  {period ? (
                    <div>
                      <p className="text-center mb-1 fw-bold">
                        {t("plan_page.plan2.y_1_2_m_f")}
                      </p>
                      <p style={{ fontSize: "10px" }} className="fw-bold">
                        {t("plan_page.plan2.y_w_1_d")}
                      </p>
                    </div>
                  ) : (
                    <p className="text-center mb-1 fw-bolder">
                      {t("plan_page.plan2.m_15")}
                    </p>
                  )}
                </div>
                <div className="d-flex justify-content-center p-2">
                  <button
                    onClick={handleClick}
                    className="btn btn-secondary btn-sm "
                  >
                    Continue
                  </button>
                </div>
                <ul className="price_ofersx mt-3">
                  <li>{t("plan_page.plan2.n_ad")}</li>
                  <li>{t("plan_page.plan2.e_e_c_a_t_c")}</li>
                  <li>{t("plan_page.plan2.a_t_c_a")}</li>
                  <li>{t("plan_page.plan2.a_t_p_f_t_n_1_m")}</li>
                  <li>{t("plan_page.plan2.a_t__his")}</li>
                  <li>{t("plan_page.plan2.o_f_p_a_s")}</li>
                  <li>{t("plan_page.plan2.l_c_w_a_a")}</li>
                  <li>{t("plan_page.plan2.o_d_a_t_a")}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-5">
            <div className="pricing-box h-100 rounded-4 overflow-hidden">
              <div className="text-center bg-secondary price_heading d-flex justify-content-center align-items-center">
                Enterprise Plan
              </div>
              <div className="p-3 ">
                <div className="d-flex flex-column justify-content-center align-items-center w-100">
                  {period ? (
                    <div>
                      <p className="text-center mb-1 fw-bold">
                        {t("plan_page.plan2.y_1_2_m_f")}
                      </p>
                      <p style={{ fontSize: "10px" }} className="fw-bold">
                        {t("plan_page.plan2.y_w_1_d")}
                      </p>
                    </div>
                  ) : (
                    <p className="text-center mb-1 fw-bolder">
                      {t("plan_page.plan2.m_15")}
                    </p>
                  )}
                </div>
                <div className="d-flex justify-content-center p-2">
                  <button
                    onClick={handleClick}
                    className="btn btn-secondary btn-sm"
                  >
                    Continue
                  </button>
                </div>
                <ul className="price_ofersx mt-3">
                  <li>{t("plan_page.plan2.n_ad")}</li>
                  <li>{t("plan_page.plan2.e_e_c_a_t_c")}</li>
                  <li>{t("plan_page.plan2.a_t_c_a")}</li>
                  <li>{t("plan_page.plan2.a_t_p_f_t_n_1_m")}</li>
                  <li>{t("plan_page.plan2.a_t__his")}</li>
                  <li>{t("plan_page.plan2.o_f_p_a_s")}</li>
                  <li>{t("plan_page.plan2.l_c_w_a_a")}</li>
                  <li>{t("plan_page.plan2.o_d_a_t_a")}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Planpage;
