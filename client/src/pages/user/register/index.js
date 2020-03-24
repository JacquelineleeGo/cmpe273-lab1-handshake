import React from "react";
import { Form, Input, Tooltip, Select, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { effects } from "../model";

import "./index.css";

const formItemLayout = {
    labelCol: {
      xs: {
        span: 24
      },
      sm: {
        span: 8
      }
    },
    wrapperCol: {
      xs: {
        span: 24
      },
      sm: {
        span: 16
      }
    }
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  };

const RegistrationForm = () => {
    const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = values => {
    console.log("Received values of form: ", values);
    dispatch(effects.register(values));
  };

    return (
    <div className="register-form">
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{}}
        scrollToFirstError
      >
        <Form.Item
          name="username"
          label={
            <span>
              Username&nbsp;
              <Tooltip title="What do you want others to call you?">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!"
            },
            {
              required: true,
              message: "Please input your E-mail!"
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Role" name="role">
          <Select>
            <Select.Option value="student">student</Select.Option>
            <Select.Option value="company">company</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!"
            }
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="passwordConfirmation"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!"
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
          <div>
            Or <Link to="/user/login">go to login!</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegistrationForm;
