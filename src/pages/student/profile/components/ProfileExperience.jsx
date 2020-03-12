import React from "react";
import { Descriptions } from "antd";

export default function(props) {
  return props.items.map((el, index) => (
    <Descriptions title={`experience ${index}`} key={el.id || index}>
      <Descriptions.Item label="name">{props.name}</Descriptions.Item>
      <Descriptions.Item label="birth">{props.birth_date}</Descriptions.Item>
      <Descriptions.Item label="city">{props.city}</Descriptions.Item>
      <Descriptions.Item label="state">{props.state}</Descriptions.Item>
      <Descriptions.Item label="country">{props.country}</Descriptions.Item>
      <Descriptions.Item label="skillset">{props.skillset}</Descriptions.Item>
      <Descriptions.Item label="career objective">
        {props.career_objective}
      </Descriptions.Item>
    </Descriptions>
  ));
}
