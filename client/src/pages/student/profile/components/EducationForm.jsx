import React from "react";
import { Form, Input, Select} from "antd";

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

const EducationForm = ({ onSubmit, initialValues = {} }) => {
  const [form] = Form.useForm();

  const onFinish = values => {
    onSubmit && onSubmit(values);
  };

  return (
    <div className="education-form">
      <Form
        {...formItemLayout}
        form={form}
        name="educatin_profile"
        onFinish={onFinish}
        initialValues={initialValues}
        scrollToFirstError
      >
        <Form.Item
          label="College_Name"
          name="college_name"
          rules={[
            {
              required: true,
              message: "Please input college Name!",
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Major" name="major"
        rules={[
          {
            required: true,
            message: "Please input the college major!",
            whitespace: true
          }
        ]}>

        {/* Software Engineering, Electrical Engineering'),('Communications'),
        // ('Business'),
        // ('Economics'),
        // ('Literature'),
        // ('Psychology'),
        // ('Education'),
        // ('Nursing'),
        // ('Computer Science'),
        // ('All');*/}
        <Select>
          <Select.Option value="on_campus">Business</Select.Option>
          <Select.Option value="com">Communications</Select.Option>
          <Select.Option value="edu">Education</Select.Option>
          <Select.Option value="ee">Electrical Engineering</Select.Option>
          <Select.Option value="on_campus">Nursing</Select.Option>
          <Select.Option value="ee">Psychology</Select.Option>
          <Select.Option value="se">Software Engineering</Select.Option>
        </Select>
        </Form.Item>
    
        <Form.Item
          label="Location"
          name="location"
          rules={[
            {
              required: true,
              message: "Please input the college location!"
            }
          ]}
        >
        <Input />
        </Form.Item>

        <Form.Item
          label="Degree"
          name="degree"
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
          label="Year_of_assing"
          name="year_of_passing"
          rules={[
            {
              required: true,
              message: "Please input when you graduated!",
              whitespace: true
            }
          ]}
        >
          <Input />
       </Form.Item>
       {/**<Form.Item {...tailFormItemLayout}>
       <Button type="primary" htmlType="submit">
         Submit
       </Button>
     </Form.Item> */}
       
      </Form>
    </div>
  );
};

export default EducationForm;


//     profile_id varchar(32) [not null, ref: > profile.uuid]

//     college_name varchar
//     location varchar
//     degree varchar
//     major varchar
//     year_of_passing date