import { Button, Form, Input, Col, Row, notification } from "antd";
import "../style/Registration.css";
import { useGlobalContext } from "../../../../context/context";
import DisplayTable from "../../../table/Table";

const DownloadIdCard = () => {
  const [api, contextHolder] = notification.useNotification();
  const { applicantData, setApplicantData } = useGlobalContext({}) || {};
  const openNotificationWithIcon = (type) => {
    if (type == "success") {
      api[type]({
        message: "Your ID Card!",
      });
    }
    if (type == "warning") {
      api[type]({
        message: "You are not registered in any course.",
      });
    }
    if (type == "error") {
      api[type]({
        message: "Some error occured! Try downloading your ID Card again.",
      });
    }
  };
  const onFinish = (values) => {
    // console.log("Success:", values);
    const { cnic } = values;
    getApplicantCard(cnic);
  };

  const getApplicantCard = async (cnic) => {
    try {
      const responseData = await fetch(
        `http://localhost:3005/applicant/get-applicant-by-cnic/${cnic}`
      );
      const data = await responseData.json();
      setApplicantData(data);
      !data.success && openNotificationWithIcon("warning");
      data.type == "warning" && openNotificationWithIcon("error");
    } catch (error) {
      console.log("Error", error);
      openNotificationWithIcon("error");
    }
  };

  const onFinishFailed = () => {
    console.log("Failed.");
  };
  return (
    <>
      {contextHolder}
      <Col xs={22} sm={22} md={16} lg={12} xl={12} className="formContainer">
        <Row justify="center">
          <Col span={24} style={{ textAlign: "center" }}>
            <br />
            <h1>Download ID Card</h1>
            <br />
          </Col>

          <Col span={24}>
            <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
              <Row justify="center">
                <Col xs={22} sm={22} md={16} lg={16} xl={16}>
                  <Form.Item
                    name="cnic"
                    rules={[
                      {
                        required: true,
                        message: "Please input your CNIC!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="CNIC (Which you provided during form submission)"
                      size={"large"}
                      className="inputBox"
                      type="number"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row justify={"center"}>
                <Col xs={22} sm={22} md={16} lg={16} xl={16}>
                  <Form.Item>
                    <Button
                      className="submitBtn"
                      htmlType="submit"
                      type="primary"
                      size={"large"}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
          {applicantData.data == null ? (
            " "
          ) : 
          applicantData.data.feeStatus === "unpaid" ? (<p style={{
            color:"red"
          }}>Kindly Pay Your Fees</p>) :  (
            <DisplayTable
              name={applicantData.data.fullname}
              course={applicantData.data.course}
            />
          )}
        </Row>
      </Col>
      <br />
      {/* <Table fullname={applicantData.data.fullname}/> */}
    </>
  );
};

export default DownloadIdCard;
