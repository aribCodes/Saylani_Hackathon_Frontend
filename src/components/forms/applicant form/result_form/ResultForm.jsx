import { useState } from "react";
import { Button, Form, Input, Col, Row, notification, Modal } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import "../style/Registration.css";

const ResultForm = () => {
  const [api, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkResult, setCheckResult] = useState();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setCheckResult(undefined)
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setCheckResult(undefined)
  };

  const openNotificationWithIcon = (type) => {
    if (type == "warning") {
      api[type]({
        message: "No result found.",
      });
    }
    if (type == "error") {
      api[type]({
        message: "Something went wrong!",
      });
    }
  };

  const onFinish = (values) => {
    getResult(values.rollNo);
  };
  const getResult = async (rollno) => {
    try {
      const response = await fetch(
        `http://localhost:3005/applicant/get-applicant-by-rollno/${rollno}`
      );
      const data = await response.json();
      console.log("user data ", data);
      setCheckResult(data.data.result);
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
  
  console.log("result", checkResult);
  return (
    <>
      {contextHolder}
      <Col xs={22} sm={22} md={16} lg={12} xl={12} className="formContainer">
        <Row justify="center">
          <Col span={24} style={{ textAlign: "center" }}>
            <br />
            <h1>Admission Test Result</h1>
            <br />
          </Col>

          <Col span={24}>
            <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
              <Row justify="center">
                <Col xs={22} sm={22} md={16} lg={16} xl={16}>
                  <Form.Item
                    name="rollNo"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Roll #!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Roll number"
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
                        onClick={showModal}
                      >
                        Submit
                      </Button>
                  </Form.Item>
                </Col>
                {
                  checkResult !== undefined ? <Modal
                  title="Result"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  {checkResult === "Pending..."?<p>Result is not updated</p> :<p>Congratulation you have Successfully pass</p>}
                </Modal>
                :
                <Modal
                title="No Record Found"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <p>Contact to SMIT for further Details</p> 
              </Modal>
                }
                
              </Row>
            </Form>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default ResultForm;
