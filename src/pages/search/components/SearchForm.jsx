import React from "react";
import { Form, Row, Col, Input, Button } from "antd";

const AdvancedSearchForm = props => {
  const [form] = Form.useForm();

  const onFinish = values => {
    props.onSubmit && props.onSubmit(values);
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      onFinish={onFinish}
    >
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            name="keyword"
            label="keyword"
            rules={[
              {
                required: true,
                message: "Input something!"
              }
            ]}
          >
            <Input placeholder="search with title or company_name" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="jobCategory" label="category">
            <Input placeholder="job category" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="jobLocation" label="location">
            <Input placeholder="job location" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            style={{ marginLeft: 8 }}
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AdvancedSearchForm;
