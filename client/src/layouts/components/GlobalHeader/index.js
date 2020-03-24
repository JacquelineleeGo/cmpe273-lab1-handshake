import React from "react";
import { Layout, Menu } from "antd";

// import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { Link } from "react-router-dom";

const { Header } = Layout;

export default function() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <Header className="basicLayout--header">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[pathname]}
        style={{ lineHeight: "64px" }}
      >
        <Menu.Item key="/home">
          <Link to="/home">Home</Link>
        </Menu.Item>
        <Menu.Item key="/user/logout">
          <Link to="/user/logout">Logout</Link>
        </Menu.Item>
        {/* {renderRoleMenu()} */}
      </Menu>
    </Header>
  );
}
