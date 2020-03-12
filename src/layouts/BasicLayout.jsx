import React, { useEffect } from "react";
import { Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";

import GlobalHeader from "./components/GlobalHeader";
import { effects } from "../pages/user/model";

import "./index.css";

const { Content, Footer } = Layout;

export default function BasicLayout(props) {
  // 需要进行初始化操作，获取用户信息
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    if (!user.id) {
      dispatch(effects.init());
    }
  }, [dispatch, user.id]);

  if (user.loading) return <div>loading...</div>;
  if (user.error) return <div>Error.</div>;

  return (
    <Layout className="basicLayout--container">
      <GlobalHeader />
      <Content className="basicLayout--content">
        <div className="site-layout-content">{props.children}</div>
      </Content>
      <Footer className="basicLayout--footer">
      </Footer>
    </Layout>
  );
}
