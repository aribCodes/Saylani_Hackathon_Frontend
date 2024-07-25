import { useState,useMemo } from "react";
import { Col, Row, Modal } from "antd";
import QRCode from "react-qr-code";
import { usePDF } from "react-to-pdf";
import "./IdCard.css";
import Logo from "../../assets/images/logo.png";
import saylaniLogo from "../../assets/images/saylaniOfficialLogo.png";
import { useLocation } from "react-router-dom";

function IdCard() {
  const location = useLocation();
  console.log("Location", location.state?.data);
  const { fullname, course, rollNo, cnic, contact, profileImg } = location.state?.data;
  const [modal2Open, setModal2Open] = useState(false);
  const { toPDF, targetRef } = usePDF({ filename: `${rollNo}.pdf` });
  
  useMemo(()=>{
    setModal2Open(true)
  },[location.state?.data])
  return (
    <>
      <Modal
        title="Do you want to download you ID Card?"
        centered
        open={modal2Open}
        okText="Download"
        cancelText="View"
        onOk={() => {
          toPDF();
          setModal2Open(false);
        }}
        onCancel={() => setModal2Open(false)}
      >
      </Modal>
      {/* <DisplayButton text="Download" handleClick={toPDF()} /> */}
      <div ref={targetRef}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} id="">
          <header>
            <Row className="container">
              <Col
                span={12}
                className="subContainer"
                style={{ borderRight: "1px dotted black" }}
              >
                <div className="cardFront">
                  <div className="frontPage">
                    <img src={Logo} alt="" className="welfareLogo" />
                    <h4 className="organizationName">
                      SAYLANI MASS IT TRAINING PROGRAM
                    </h4>
                    <img
                      src={`data:${profileImg}`}
                      alt="Profile Image"
                      className="profileImg"
                    />
                    <span className="applicantName">{fullname}</span>
                    <span className="courseName">{course}</span>
                    <span className="rollNo">Roll # {rollNo}</span>
                  </div>
                </div>
              </Col>
              <Col span={12} className="subContainer">
                <div className="cardBack">
                  <p className="data">
                    Name: <span className="info">{fullname}</span>
                  </p>
                  <p className="data">
                    CNIC: <span className="info">{cnic}</span>
                  </p>
                  <p className="data">
                    Contact No: <span className="info">{contact}</span>
                  </p>
                  <p className="data">
                    Course: <span className="info">{course}</span>
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div className="qrCode">
                      <QRCode
                        size={80}
                        bgColor="white"
                        fgColor="black"
                        value={rollNo}
                      />
                    </div>
                    <p className="warningNote">
                      Note: This Card is for SMIT premises only. If found please
                      return to SMIT.
                    </p>

                    <p
                      style={{
                        borderTop: "2px solid black",
                        marginTop: "40px",
                        fontWeight: "600",
                      }}
                    >
                      Issuing authority
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </header>
          <body>
            <Row>
              <Col
                span={24}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div className="instructions">
                  <h2 className="instructionHeading">Instructions:</h2>
                  <ol>
                    <li>Please bring color print of this Admit/ID Card.</li>
                    <li>
                      Attestation of ID/Admit Card is extremely mandatory from
                      SMIT.
                    </li>
                    <li>
                      No student will be allowed to enter in Entry test without
                      attestation of Admit/ID Card.
                    </li>
                    <li>
                      Bring CNIC/B-Form and Last qualification
                      Marksheet/Certification (both original) at the time of
                      Attestation.
                    </li>
                    <li>
                      Address: Gulshan Campus (2nd Floor, Mumtaz Mobile Mall,
                      Gulshan Chowrangi)/A-25, saylani head office 4th floor,
                      char minar chowrangi, bahardurabad.
                    </li>
                    <li>
                      Gulshan Campus: https://goo.gl.maps/oTtdJ7BRqxoAto2w9 Head
                      office Campus: https://goo.gl/maps/zeihum2dQRULz3Ht5
                    </li>
                    <li>
                      For further information please like & follow our Facebook
                      Page: https://www.facebook.com/SaylaniMassITraining
                    </li>
                  </ol>
                </div>
              </Col>
            </Row>
          </body>
          <footer>
            <Row>
              <Col span={24}>
                <div className="footerPart">
                  <img src={saylaniLogo} alt="Saylani" />
                  <p>Donate Us:</p>
                  <a href="https://www.saylaniwelfare.com/en">
                    www.saylaniwelfare.com
                  </a>
                </div>
              </Col>
            </Row>
          </footer>
        </Col>
        <div
          style={{
            display: "block",
          }}
        ></div>
      </div>
    </>
  );
}

export default IdCard;
