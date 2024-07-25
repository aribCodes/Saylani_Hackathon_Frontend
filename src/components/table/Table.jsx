import { Space, Table, Row, Col } from "antd";
import DisplayButton from "../button/DownloadIdCardButton";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import "./Table.css";


function DisplayTable({ course, name }) {
  const {applicantData}=useGlobalContext();
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          {/* <a>{record.}</a> */}
          <a>
            <DisplayButton text={<Link to="/card" state={applicantData}>View</Link>}/>
          </a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: `${name}`,
      course: `${course}`,
    },
  ];
  return (
    <div>
      <Row>
        <Col span={24}>
          <Table
            className="table"
            columns={columns}
            dataSource={data}
            pagination={false}
          ></Table>
        </Col>
      </Row>
    </div>
  );
}

export default DisplayTable;
