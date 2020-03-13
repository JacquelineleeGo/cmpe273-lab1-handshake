import React from "react";
import { Descriptions } from "antd";

export default function(props) {
  return props.items.map((el, index) => (
    <Descriptions title={`experience ${index + 1}`} key={el.id || index}>
      <Descriptions.Item label="company_name">{el.company_name}</Descriptions.Item>
      <Descriptions.Item label="title">{el.title}</Descriptions.Item>
      <Descriptions.Item label="location">{el.location}</Descriptions.Item>
      <Descriptions.Item label="start_date">{el.start_date}</Descriptions.Item>
      <Descriptions.Item label="end_date">{el.end_date}</Descriptions.Item>
    </Descriptions>
  ));
}
