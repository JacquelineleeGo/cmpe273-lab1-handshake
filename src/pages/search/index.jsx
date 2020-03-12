import React, { useState } from "react";
import { Table, Popconfirm, message, Button } from "antd";
import { useSelector } from "react-redux";

import SearchForm from "./components/SearchForm";
import BasicLayout from "../../layouts/BasicLayout";

import * as api from "./service";

export default function SearchPage(props) {
  const [jobs, setJobs] = useState([]);
  const user = useSelector(state => state.user);

  const handleSubmit = async values => {
    try {
      const jobs = await api.queryJobs(values);
      setJobs(jobs);
    } catch (e) {
      console.log("e:", e);
    }
  };

  const handleApply = async record => {
    try {
      await api.applyJob(user.id, record.id);
      message.success("申请成功");
    } catch (e) {
      console.error("e:", e);
    }
  };

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
      title: "job desc",
      dataIndex: "job_description",
      key: "job_description"
    },
    {
      title: "application_deadline",
      dataIndex: "application_deadline",
      key: "application_deadline"
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Popconfirm
          title="Want to apply?"
          onConfirm={() => handleApply(record)}
          okText="Yes"
          cancelText="No"
        >
          <Button>apply</Button>
        </Popconfirm>
      )
    }
  ];

  return (
    <BasicLayout>
      <SearchForm onSubmit={handleSubmit} />

      <Table rowKey="id" columns={columns} dataSource={jobs} />
    </BasicLayout>
  );
}
