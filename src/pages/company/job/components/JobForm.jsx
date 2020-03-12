import React from "react";
import { Form, Input, InputNumber, Button } from "antd";

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
          label="title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please input your title!",
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="category"
          name="category"
          rules={[
            {
              required: true,
              message: "Please input your category!",
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="salary"
          name="salary"
          rules={[
            {
              required: true,
              message: "Please input your salary!"
            }
          ]}
        >
          <InputNumber />
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
          label="job_description"
          name="job_description"
          rules={[
            {
              required: true,
              message: "Please input your job_description!",
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="application_deadline"
          name="application_deadline"
          rules={[
            {
              required: true,
              message: "Please input your application_deadline!",
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