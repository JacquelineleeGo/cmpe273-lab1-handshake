import React from "react";
import { Layout } from "antd";

import "./index.css";

const { Content, Footer } = Layout;

export default function BasicLayout(props) {

  return (
    <Layout className="basicLayout--container">
      <Content className="basicLayout--content">
        <div className="site-layout-content">{props.children}</div>
      </Content>
      <Footer className="basicLayout--footer">
      </Footer>
    </Layout>
  );
}
