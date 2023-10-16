import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Segmented,
  Select,
  SelectProps,
  Space,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { TopicType } from "../topics/createTopics";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";

export const Trigger = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subscriberId, setSubscriberId] = useState("");
  const [topicKey, setTopicKey] = useState("");
  const [segmented, setSegmented] = useState("subscriber");
  const [optionTopic, setOptionTopic] = useState<SelectProps["options"]>([]);

  const fetchDataTopic = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/topics`);
      const topics: TopicType[] = response.data;

      const listTopics: SelectProps["options"] = [];
      for (const elm of topics) {
        listTopics.push({
          label: elm.name,
          value: elm.key,
        });
      }
      setOptionTopic(listTopics);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSendToSubscriber = async () => {
    try {
      await axios.post("http://localhost:3001/event", {
        subscriberId: subscriberId,
        title: title,
        description: description,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendToTopic = async () => {
    await axios.post(`http://localhost:3001/event/topics/${topicKey}`, {
      key: topicKey,
      title: title,
      description: description,
    });
  };

  useEffect(() => {
    fetchDataTopic();
  }, []);

  return (
    <Row justify="center" align="middle">
      <Col>
        <Card
          title="Push notification"
          style={{ width: 400, textAlign: "center" }}
          type="inner"
        >
          <Row gutter={[32, 32]} justify="center" align="middle">
            <Col>
              <Space style={{ width: 300 }} direction="vertical">
                <Input
                  placeholder="Enter title notification"
                  onChange={(e) => setTitle(e.target.value)}
                  required={true}
                />
                <TextArea
                  rows={4}
                  placeholder="Enter description notification"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Space>
            </Col>
            <Col>
              <Segmented
                style={{ width: 200, marginBottom: 10 }}
                onChange={(e) => setSegmented(e.toString())}
                block
                options={[
                  {
                    label: <Typography.Text>Subscriber</Typography.Text>,
                    value: "subscriber",
                  },
                  {
                    label: <Typography.Text>Topic</Typography.Text>,
                    value: "topic",
                  },
                ]}
              />
              {segmented === "subscriber" ? (
                <Space direction="vertical">
                  <Typography.Text>Enter address to send:</Typography.Text>
                  <Input
                    style={{ width: 200 }}
                    onChange={(e) => setSubscriberId(e.target.value)}
                  />
                </Space>
              ) : (
                <Space direction="vertical">
                  <Typography.Text>Chose topic to send:</Typography.Text>
                  <Select
                    defaultValue="Chose topic"
                    style={{ width: 200 }}
                    onChange={setTopicKey}
                    options={optionTopic}
                  ></Select>
                </Space>
              )}
            </Col>
            <Col span={24} style={{ textAlign: "center" }}>
              <Button
                style={{ width: 200 }}
                type="primary"
                onClick={
                  segmented === "subscriber"
                    ? handleSendToSubscriber
                    : handleSendToTopic
                }
              >
                Send to {segmented}
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
