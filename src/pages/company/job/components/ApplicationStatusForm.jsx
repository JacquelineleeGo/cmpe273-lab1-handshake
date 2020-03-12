import React from "react";
import { Modal, Form, Select } from "antd";

const { Option } = Select;

const CollectionSubmitForm = ({ initial, visible, onSubmit, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Change status"
      okText="Change"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onSubmit(values);
          })
          .catch(info => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={initial}
      >
        <Form.Item
          name="status"
          label="status"
          rules={[
            {
              required: true,
              message: "Please select!"
            }
          ]}
        >
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            <Option value="pending">pending</Option>
            <Option value="reviewed">reviewed</Option>
            <Option value="declined">declined</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CollectionSubmitForm;