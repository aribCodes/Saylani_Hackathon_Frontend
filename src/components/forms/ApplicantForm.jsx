import { useEffect, useState } from "react";
import Registration from "./applicant form/registration/Registration";
import DownloadIdCard from "./applicant form/download_id_card_form/DownloadIdCard";
import ResultForm from "./applicant form/result_form/ResultForm";
import "./applicantForm.css";
import { Row } from "antd";

const ApplicantForm = () => {
  const [switching, setSwitching] = useState(1);
  const [courses, setCourses] = useState({});
  useEffect(() =>{  
    (async()=>{
      const getCourses = await fetch("http://localhost:3005/applicant/get-courses");
      const response = await getCourses.json();
      setCourses(courses);
      console.log("courses received: ", response);
    })()
  },[courses])
  return (
    <Row>
    <div className="mainContainer">
      <div className="mainContainerHeader">
        <div className="saylaniLogo"></div>
      </div>
      <div className="regitrationContainer">
        <div className="switch">
          <button
            className={switching==1?"active":"disable"}
            onClick={() => {
              setSwitching(1);
            }}
          >
            Registration
          </button>
          <button
            className={switching==2?"active":"disable"}
            onClick={() => {
              setSwitching(2);
            }}
          >
            Download ID Card
          </button>
          <button
            className={switching==3?"active":"disable"}
            onClick={() => {
              setSwitching(3);
            }}
          >
            Results
          </button>
        </div>
        {switching == 1 && <Registration />}
        {switching == 2 && <DownloadIdCard />}
        {switching == 3 && <ResultForm />}
      </div>
    </div>
    </Row>
  );
};

export default ApplicantForm;
