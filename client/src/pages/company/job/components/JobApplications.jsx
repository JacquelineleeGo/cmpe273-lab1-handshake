import React, { useState } from "react";
import { Table, Button, message } from "antd";
import { useDispatch } from "react-redux";

import { effects } from "../../model/job";

import ApplicationStatusForm from "./ApplicationStatusForm";

export default function(props) {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(null);
  const dispatch = useDispatch();

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "resume",
      dataIndex: "resume",
      key: "resume"
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status"
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Button
            onClick={() => {
              setCurrent(record);
              setVisible(true);
            }}
          >
            Change Status
          </Button>
        </span>
      )
    }
  ];

  const handleSubmit = async values => {
    console.log("handleSubmit:", values);
    const { uid, jid } = props;
    const { id: aid } = current;

    try {
      await dispatch(effects.changeApplicationStatus(uid, jid, aid, values));
      message.success("change success");
    } catch (e) {}
  };

  const handleCancel = () => {
    setVisible(false);
    setCurrent(null);
  };

  return (
    <>
      <Table
        rowKey="id"
        dataSource={props.list}
        columns={columns}
        pagination={false}
      />
      <ApplicationStatusForm
        visible={visible}
        initial={current}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </>
  );
}