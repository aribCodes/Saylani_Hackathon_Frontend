import { useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Upload,
  Select,
  Col,
  Row,
  notification,
} from "antd";
import ImgCrop from "antd-img-crop";

import "../style/Registration.css";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

function Registration() {
  const [size, setSize] = useState("large");
  const [image, setImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    if (type == "success") {
      api[type]({
        message: "Your response has been recorded. Thank you!",
      });
    }
    if (type == "warning") {
      api[type]({
        message: "You are already registered in one course.",
      });
    }
    if (type == "error") {
      api[type]({
        message: "Some error occured! Try submitting your form again.",
      });
    }
  };
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setImage(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => {
          resolve(reader.result);
        };
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onFinish = async (values) => {
    // console.log("image ka path ", image[0].name);
    let src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(image[0].originFileObj);
      reader.onload = () => {
        resolve(reader.result);
      };
    });
    values.profileImg = src;

    await fetch("http://localhost:3005/applicant/create-applicant", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullname: values.fullname,
        email: values.email,
        cnic: values.cnic,
        contact: values.contact,
        dateOfBirth: values.dateOfBirth,
        gender: values.gender,
        address: values.address,
        qualification: values.qualification,
        profileImg: values.profileImg,
        course: values.course,
      }),
    }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log("uplodaded ",data)
        data.success?openNotificationWithIcon("success"):openNotificationWithIcon("warning");
        data.type=="warning"&&openNotificationWithIcon("error")
      }).catch((error) => {
        error && openNotificationWithIcon("error");
        console.log("This error occured: ",error.message)
      });
  };
  const onFinishFailed = () => {
    console.log("Some Error Occured while submitting form");
  };

  return (
    <>
      {contextHolder}
      <Col xs={22} sm={22} md={16} lg={16} xl={16} className="formContainer">
        <Row justify="center">
          <Col span={24} style={{ textAlign: "center" }}>
            <br />
            <h1>Registration Form - SMIT</h1>
            <br />
          </Col>

          <Col span={24}>
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="true"
              method="post"
            >
              <Row justify="space-around">
                <Col xs={22} sm={22} md={11} lg={11} xl={11}>
                  <Form.Item
                    name="fullname"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Full name!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Full Name"
                      size={size}
                      className="inputBox"
                    />
                  </Form.Item>
                </Col>
                <Col xs={22} sm={22} md={11} lg={11} xl={11}>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your E-mail!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="E-mail"
                      size={size}
                      className="inputBox"
                      type="email"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row justify="space-around">
                <Col xs={22} sm={22} md={11} lg={11} xl={11}>
                  <Form.Item
                    name="cnic"
                    rules={[
                      {
                        required: true,
                        message: "Please input your CNIC No.",
                      },
                    ]}
                  >
                    <Input
                      placeholder="CNIC"
                      size={size}
                      className="inputBox"
                      type="number"
                    />
                  </Form.Item>
                </Col>
                <Col xs={22} sm={22} md={11} lg={11} xl={11}>
                  <Form.Item
                    name="course"
                    rules={[
                      {
                        required: true,
                        message: "Please select course!",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select Course"
                      className="inputBox"
                      style={{ height: "40px", textAlign: "left" }}
                    >
                      <Select.Option value="Web And App">Web And App</Select.Option>
                      <Select.Option value="Flutter">Flutter</Select.Option>
                      <Select.Option value="Graphic Designing">Graphic Designing</Select.Option>
                      <Select.Option value="AI Chatbot">AI Chatbot</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="space-around">
                <Col xs={22} sm={22} md={11} lg={11} xl={11}>
                  <Form.Item
                    name="gender"
                    rules={[
                      {
                        required: true,
                        message: "Please select gender!",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select Gender"
                      className="inputBox"
                      style={{ height: "40px", textAlign: "left" }}
                    >
                      <Select.Option value="male">Male</Select.Option>
                      <Select.Option value="female">Female</Select.Option>
                      <Select.Option value="other">Other</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={22} sm={22} md={11} lg={11} xl={11}>
                  <Form.Item
                    name="qualification"
                    rules={[
                      {
                        required: true,
                        message: "Please select your Qualification!",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select Last Qualification"
                      className="inputBox"
                      style={{ height: "40px", textAlign: "left" }}
                    >
                      <Select.Option value="Matric">Matric</Select.Option>
                      <Select.Option value="Intermediate">
                        Intermediate
                      </Select.Option>
                      <Select.Option value="Undergraduate">
                        Undergraduate
                      </Select.Option>
                      <Select.Option value="Graduate">Graduate</Select.Option>
                      <Select.Option value="Masters">Masters</Select.Option>
                      <Select.Option value="PHD">PHD</Select.Option>
                      <Select.Option value="Other">Other</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row justify="space-around">
                <Col xs={22} sm={22} md={11} lg={11} xl={11}>
                  <Form.Item
                    name="contact"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Mobile No.",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Mobile No"
                      size={size}
                      className="inputBox"
                      type="number"
                    />
                  </Form.Item>
                </Col>
                <Col xs={22} sm={22} md={11} lg={23} xl={11}>
                  <Form.Item
                    name="dateOfBirth"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Full name!",
                      },
                    ]}
                  >
                    <DatePicker
                      placeholder="Date of Birth"
                      size={size}
                      className="inputBox"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                
              </Row>

              <Row justify="space-around">
                <Col xs={22} sm={22} md={23} lg={23} xl={23}>
                  <Form.Item
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Address!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Address"
                      size={size}
                      className="inputBox"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row justify="start">
                <Col
                  xs={10}
                  sm={5}
                  md={5}
                  lg={5}
                  xl={5}
                  flex={2}
                  style={{ paddingLeft: "15px" }}
                >
                  <Form.Item
                    // label="Picture"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    name="profileImg"
                  >
                    <ImgCrop rotationSlider>
                      <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={onPreview}
                      >
                        {fileList.length < 1 && (
                          <button
                            style={{
                              border: 0,
                              background: "none",
                              width: "100%",
                              height: "100%",
                              fontSize: "small",
                            }}
                            type="button"
                          >
                            <p>
                              <span style={{ fontSize: "large" }}>+</span>{" "}
                              Upload Image
                            </p>{" "}
                          </button>
                        )}
                      </Upload>
                    </ImgCrop>
                  </Form.Item>
                </Col>
                <Col flex={3}>
                  <div className="pictureDescription">
                    <span>With white or blue background</span>
                    <span>File size must be less than 1MB</span>
                    <span> File type: jpg, jpeg, png</span>
                    <span>Upload your recent passport size picture</span>
                    <span>
                      Your Face should be clearly visible without any Glasses
                    </span>
                  </div>
                </Col>
              </Row>

              <Form.Item>
                <Button
                  className="submitBtn"
                  htmlType="submit"
                  type="primary"
                  size={size}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <hr />
            <div className="notice">
              <ol>
                <li>
                  I hereby, solemnly declare that the data and facts mentioned
                  herein are true and correct to the best of my knowledge.
                  Further, I will abide by all the established and future
                  regulations and policies of SWIT.
                </li>
                <li>
                  I hereby accept the responsibilities of good conduct and
                  guarantee that I will not be involved in any other activity,
                  political or ethical, but learning during my stay in the
                  program.
                </li>
                <li>
                  Defiance will render my admission canceled at any point in
                  time.
                </li>
                <li>
                  Upon completion, of the course, I will complete the required
                  project by SWIT.
                </li>
                <li>
                  It's mandatory for female students to wear abaya/hijab in the
                  class.
                </li>
              </ol>
              <p></p>
            </div>
          </Col>
        </Row>
      </Col>
    </>
  );
}

export default Registration;