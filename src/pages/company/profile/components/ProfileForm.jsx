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
        name="company_profile"
        onFinish={onFinish}
        initialValues={initialValues}
        scrollToFirstError
      >
        <Form.Item
          label="name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="location"
          name="location"
          rules={[
            {
              required: true,
              message: "Please input your location!",
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input your description!",
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="contact_email"
          name="contact_email"
          rules={[
            {
              required: true,
              message: "Please input your contact_email!",
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="contact_phone"
          name="contact_phone"
          rules={[
            {
              required: true,
              message: "Please input your contact_phone!",
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