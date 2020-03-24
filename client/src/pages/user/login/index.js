import React from "react";
import { Form, Input, Button } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

import { effects } from "../model";

import "./index.css";

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
};

const NormalLoginForm = props => {
  const [form] = Form.useForm(); // 
  
  const onFinish = values => {
    console.log("Success:", values);
    const { actions } = props;

    actions.login(values);
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-form">
      <Form
        form={form}
        {...layout}
        name="basic"
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!"
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
          <div>
            Or <Link to="/user/register">register now!</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  ...user
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...effects
      },
      dispatch
    )
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm);
