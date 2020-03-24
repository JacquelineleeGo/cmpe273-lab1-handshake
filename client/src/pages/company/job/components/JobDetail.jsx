import React from "react";
import { Descriptions } from "antd";

export default function(props) {
  return (
    <Descriptions title="Basic Info">
      <Descriptions.Item label="name">{props.name}</Descriptions.Item>
      <Descriptions.Item label="location">{props.location}</Descriptions.Item>
      <Descriptions.Item label="description">{props.description}</Descriptions.Item>
      <Descriptions.Item label="contact_email">{props.contact_email}</Descriptions.Item>
      <Descriptions.Item label="contact_phone">{props.contact_phone}</Descriptions.Item>
    </Descriptions>
  );
}