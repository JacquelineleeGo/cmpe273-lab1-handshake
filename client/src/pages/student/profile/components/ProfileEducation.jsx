import React from "react";
import { Descriptions } from "antd";

export default function(props) {
  return (
    <Descriptions title="Education">
      <Descriptions.Item label="college">{props.college}</Descriptions.Item>
      <Descriptions.Item label="major">{props.major}</Descriptions.Item>
      <Descriptions.Item label="location">{props.location}</Descriptions.Item>
      <Descriptions.Item label="degree">{props.degree}</Descriptions.Item>
      <Descriptions.Item label="year_of_passing">{props.year_of_passing}</Descriptions.Item>    
    </Descriptions>
  );
}
