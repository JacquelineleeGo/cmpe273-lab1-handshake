import React from "react";
import { Form, Input, Button } from "antd";

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

const ProfileForm = ({ onSubmit, initialValues = {} }) => {
  const [form] = Form.useForm();

  const onFinish = values => {
    onSubmit && onSubmit(values);
  };

  return (
    <div className="register-form">
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={initialValues}
        scrollToFirstError
      >
        <Form.Item
          label="name"
          name={["profileBasic", "name"]}
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
          label="birth_date"
          name={["profileBasic", "birth_date"]}
          rules={[
            {
              required: true,
              message: "Please input your birth_date!",
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="city"
          name={["profileBasic", "city"]}
          rules={[
            {
              required: true,
              message: "Please input your city!",
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="state"
          name={["profileBasic", "state"]}
          rules={[
            {
              required: true,
              message: "Please input your state!",
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="country"
          name={["profileBasic", "country"]}
          rules={[
            {
              required: true,
              message: "Please input your country!",
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="skillset"
          name={["profileBasic", "skillset"]}
          rules={[
            {
              required: true,
              message: "Please input your skillset!",
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="career_objective"
          name={["profileBasic", "career_objective"]}
          rules={[
            {
              required: true,
              message: "Please input your career_objective!",
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
       
      </Form>
    </div>
  );
};

export default ProfileForm;
