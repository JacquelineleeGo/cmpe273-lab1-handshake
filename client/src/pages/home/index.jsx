import React from "react";
import { Button, Result, Card, Col, Row } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import BasicLayout from "../../layouts/BasicLayout";

export default function Routes(props) {
  const user = useSelector(state => state.user);

  return (
    <BasicLayout>
      <Result
        icon={<SmileOutlined />}
        title={`${user.username}, Welcome to HandShake!`}
      />
      {user.role === "student" ? (
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Profile" bordered={false}>
              <Button type="primary" shape="round">
                <Link to="/student/profile">Go</Link>
              </Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Job Search" bordered={false}>
              <Button type="primary" shape="round">
                <Link to="/search">Go</Link>
              </Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Applications" bordered={false}>
              <Button type="primary" shape="round">
                <Link to="/student/application">Go</Link>
              </Button>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Company Profile" bordered={false}>
              <Button type="primary" shape="round">
                <Link to="/company/profile">Go</Link>
              </Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Post Jobs" bordered={false}>
              <Button type="primary" shape="round">
              <Link to="/company/job/create">Go</Link>
              </Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Job Postings" bordered={false}>
              <Button type="primary" shape="round">
              <Link to="/company/job">Go</Link>
              </Button>
            </Card>
          </Col>
        </Row>
      )}
    </BasicLayout>
  );
}
