import React from "react";
import { Flex, Spin } from "antd";

const contentStyle: React.CSSProperties = {
  padding: 50,
  // background: "rgba(0, 0, 0, 0.05)",
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

const Spinner = () => (
  <Flex gap="middle" vertical>
    <Spin tip="Loading" size="large">
      {content}
    </Spin>
  </Flex>
);

export default Spinner;
