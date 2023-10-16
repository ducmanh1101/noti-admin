import { Button, Col, Form, Input, Modal, Row, Typography } from "antd";
import axios from "axios";
import { useState } from "react";
import { urlServer } from "../../configs";

export interface TopicType {
  key: string;
  name: string;
  subscribers: [];
}

export const CreateTopics = () => {
  const [topicKey, setTopicKey] = useState("");
  const [topicName, setTopicName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTopic = async () => {
    try {
      await axios.post(`${urlServer}/topics`, {
        key: topicKey,
        name: topicName,
      });
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button
        style={{
          display: "flex",
          border: "none",
          height: 50,
          fontSize: 20,
          alignItems: "center",
          fontWeight: 600,
          marginBottom: 20,
          backgroundColor: "#d4f0fc",
        }}
        onClick={() => setIsModalOpen(true)}
      >
        Create topics
      </Button>
      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer=""
      >
        <Row gutter={[8, 8]} justify="center" align="middle">
          <Col span={24} style={{ textAlign: "center" }}>
            <Typography.Title level={4}>Create Topic:</Typography.Title>
          </Col>
          <Col>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <Form.Item
                label="Topic Key"
                name="TopicKey"
                rules={[
                  { required: true, message: "Please input your topic key!" },
                ]}
              >
                <Input onChange={(e) => setTopicKey(e.target.value)} />
              </Form.Item>

              <Form.Item
                label="Topic name"
                name="TopicName"
                rules={[
                  { required: true, message: "Please input your topic name!" },
                ]}
              >
                <Input onChange={(e) => setTopicName(e.target.value)} />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                <Button
                  style={{ backgroundColor: "#d4f0fc", border: "none" }}
                  htmlType="submit"
                  onClick={handleCreateTopic}
                >
                  Create
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
