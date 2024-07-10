import { Col, Card } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook from react-i18next
import { useSelector } from "react-redux"; // Import useSelector hook from react-redux
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from react-router-dom
import i18n from "../../Helper/i18next";

function Plan() {
  const { t } = useTranslation();
  const currentLanguage = useSelector((state) => state.language.currentLanguage);
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, []);

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    reenterPassword: "",
    agreeTerms: false,
    selectedPlan: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handlePlanSelect = (plan) => {
    setFormData({
      ...formData,
      selectedPlan: plan,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <Col className="d-flex flex-column m-5">
      <h4 className="text-center">Subscription Plans</h4>
      <div className="d-flex justify-content-between gap-3 flex-grow-1">
        <div className="w-50 d-flex flex-column gap-3">
          <div onClick={() => handlePlanSelect("basic")} className="">
            <Card
              style={{ cursor: "pointer" }}
              className={` ${
                formData.selectedPlan === "basic" ? "activePricePlan" : ""
              }`}
            >
              <Card.Body>
                {formData.selectedPlan === "basic" && (
                  <span className="position-absolute top-0 end-0 p-2">
                    &#10004;
                  </span>
                )}
                <Card.Title className="text-center  ">Basic Plan</Card.Title>
                <Card.Text>
                  <ul>
                    <li>Access to Cryptocurrency Analytics</li>
                    <li>
                      Access to Predictions (For the next 30 minutes with
                      1-minute interval)
                    </li>
                    <li>Access to 14 days of historical data</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div onClick={() => handlePlanSelect("standard")}>
            <Card
              style={{ cursor: "pointer" }}
              className={` ${
                formData.selectedPlan === "standard" ? "activePricePlan" : ""
              }`}
            >
              <Card.Body>
                {formData.selectedPlan === "standard" && (
                  <span className="position-absolute top-0 end-0 p-2">
                    &#10004;
                  </span>
                )}
                <Card.Title className="text-center">Standard Plan</Card.Title>
                <Card.Text>
                  <ul>
                    <li>No ads</li>
                    <li>Exclusive email content about the crypto trends</li>
                    <li>Access to Cryptocurrency Analytics</li>
                    <li>
                      Access to Predictions (For the next 60 minutes with 30
                      seconds and 1-minute intervals)
                    </li>
                    <li>Access to 3 months of Historical data</li>
                  </ul>
                  <div className="d-flex flex-column justify-content-center align-items-center w-100">
                    <h3>Pricing</h3>
                    <p>Monthly: $10</p>
                    <p>Yearly: $100</p>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>

        <div onClick={() => handlePlanSelect("enterprise")} className=" w-50 ">
          <Card
            style={{ cursor: "pointer", height: "100%" }}
            className={` ${
              formData.selectedPlan === "enterprise" ? "activePricePlan" : ""
            }`}
          >
            <Card.Body className="position-relative">
              {formData.selectedPlan === "enterprise" && (
                <span className="position-absolute top-0 end-0 p-2">
                  &#10004;
                </span>
              )}
              <Card.Title className="text-center">Enterprise Plan</Card.Title>
              <Card.Text>
                <ul>
                  <li>No ads</li>
                  <li>Exclusive email content about the crypto trends</li>
                  <li>Access to Cryptocurency Analytics</li>
                  <li>
                    Access to Predictions (For the next 120 minutes with 15sec,
                    30sec, and 1-minute intervals)
                  </li>
                  <li>Access to complete Historical data</li>
                  <li>Opportunity for Partnerships and Sponsorships</li>
                  <li>Live chat with an Analyst</li>
                  <li>On-demand automated trading agent</li>
                </ul>
                <div className="d-flex flex-column justify-content-center align-items-center w-100">
                  <h3>Pricing</h3>
                  <p>Monthly: $15</p>
                  <p>Yearly: $150 (2 months free)</p>
                  <p style={{ fontSize: "15px" }}>
                    Yearly with 10% discount (autopay enabled): $135
                  </p>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Col>
  );
}

export default Plan;
