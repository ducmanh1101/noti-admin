import { Col, Row } from "antd";
import React from "react";
import { Admin } from "./admin";

export const App = () => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Admin />
      </Col>
    </Row>
  );
};
