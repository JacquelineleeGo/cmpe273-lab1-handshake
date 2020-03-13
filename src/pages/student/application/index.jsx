import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";

import * as api from "../model/service";

export default function ApplicationsPage() {
  const [jobs, setJobs] = useState([]);
  const user = useSelector(state => state.user);

  useEffect(() => {
    async function queryApplications() {
      const jobs = await api.queryApplications(user.id);
      setJobs(jobs);
    }
    if (user.id) queryApplications();
  }, [user.id]);

  const columns = [
    {
      title: "job_id",
      dataIndex: "job_id",
      key: "job_id"
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status"
    }
  ];

  return (
    <>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={jobs}
        pagination={false}
      />
    </>
  );
}
