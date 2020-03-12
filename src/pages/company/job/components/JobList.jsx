import React from "react";
import { Table, Divider } from "antd";

import { Link } from "react-router-dom";

export default function(props) {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location"
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary"
    },
    {
      title: "job_desc",
      dataIndex: "job_description",
      key: "job_description"
    },
    {
      title: "application_dealine",
      dataIndex: "application_dealine",
      key: "application_dealine"
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Link to={`/company/job/${record.id}`}>modify</Link>
          <Divider type="vertical" />
          <Link to={`/company/application/${record.id}`}>applications</Link>
        </span>
      )
    }
  ];
  return (
    <Table
      rowKey="id"
      dataSource={props.list}
      columns={columns}
      pagination={false}
    />
  );
}