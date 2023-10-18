import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Input,
  Modal,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import Column from "antd/es/table/Column";
import { DeleteOutlined, MinusCircleOutlined } from "@ant-design/icons";
import axios from "axios";

import { CreateTopics } from "../topics/createTopics";
import { TopicType } from "../topics/createTopics";
import { urlServer } from "../../configs";

export const ManageTopics = () => {
  const [dataTopic, setDataTopic] = useState<TopicType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subscriber, setSubscriber] = useState("");

  const handleRemoveSubscriber = async (topicKey: string) => {
    try {
      console.log(subscriber);
      await axios.post(`${urlServer}/topics/${topicKey}/subscribers/removal`, {
        subscriberId: subscriber,
      });
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTopic = async (topicKey: string) => {
    try {
      await axios.delete(`${urlServer}/topics/${topicKey}`);
    } catch (error) {
      alert("Can't be deleted as it still has subscribers assigned");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${urlServer}/topics`);
        setDataTopic(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [dataTopic]);
  return (
    <Row gutter={[8, 8]} justify="center">
      <Col>
        <CreateTopics />

        <Card>
          <Table dataSource={dataTopic}>
            <Column title="Topic name" dataIndex="name" key="name" />
            <Column
              title="Subscribers"
              dataIndex="subscribers"
              key="subscribers"
              render={(subscribers: string[]) => (
                <Space>
                  {subscribers.map((sub) => (
                    <Tag key={sub}>{sub}</Tag>
                  ))}
                </Space>
              )}
            />
            <Column
              title="Action"
              key="key"
              dataIndex="key"
              render={(key: string) => (
                <Space key={key} size="middle">
                  <Button
                    style={{ border: "none" }}
                    onClick={() => setIsModalOpen(true)}
                  >
                    <MinusCircleOutlined />
                  </Button>
                  <Modal
                    style={{ textAlign: "center" }}
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    footer=""
                  >
                    <Space
                      style={{ margin: 30, gap: 10, width: "60%" }}
                      direction="vertical"
                    >
                      <Typography.Title level={3}>
                        Remove subscriber
                      </Typography.Title>
                      <Input
                        onChange={(e) => setSubscriber(e.target.value)}
                        placeholder="Enter address subscriber"
                      />
                      <Button
                        style={{
                          backgroundColor: "#d4f0fc",
                          border: "none",
                          marginTop: 10,
                        }}
                        onClick={() => handleRemoveSubscriber(key)}
                      >
                        Remove
                      </Button>
                    </Space>
                  </Modal>
                  <Button
                    style={{ border: "none" }}
                    onClick={() => handleDeleteTopic(key)}
                  >
                    <DeleteOutlined />
                  </Button>
                </Space>
              )}
            />
          </Table>
        </Card>
      </Col>
    </Row>
  );
};
