import { Flex, Spin } from "antd";
import { CSSProperties } from "react";

const contentStyle: CSSProperties = {
  padding: 50,
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

// TODO: change import

const Spinner = () => (
  <Flex gap="middle" vertical>
    <Spin tip="Loading" size="large">
      {content}
    </Spin>
  </Flex>
);

export default Spinner;
