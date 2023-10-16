import { useEffect, useState } from "react";
import axios from "axios";
import {
  NotificationBell,
  NovuProvider,
  PopoverNotificationCenter,
} from "@novu/notification-center";
import { Button, Card, Col, Empty, Row, Space, Table, Typography } from "antd";
import Column from "antd/es/table/Column";

import { UseNotifications } from "./customLayoutInApp";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { appId, urlServer } from "../../configs";

export interface subsType {
  channels: [
    {
      _integrationId: string;
      credentials: {
        channel: string;
        deviceTokens: [string];
        webhookUrl: string;
      };
      integrationIdentifier: string;
      providerId: string;
    }
  ];
  createdAt: string;
  deleted: boolean;
  email: string;
  firstName: string;
  id: string;
  isOnline: boolean;
  lastName: string;
  lastOnlineAt: string;
  phone: string;
  subscriberId: string;
  updatedAt: string;
  __v: number;
  _environmentId: number;
  _id: string;
  _organizationId: string;
}

const ShowAllSubscribers = () => {
  const [dataSubs, setDataSubs] = useState<subsType[]>([]);
  const [dataSub, setDataSub] = useState<subsType[]>([]);
  const applicationId: any = appId;

  const handleShow = async (subscriberId: string) => {
    try {
      const response = await axios.get<subsType[]>(
        `${urlServer}/subscribers/${subscriberId}`
      );
      const data = response.data;
      setDataSub(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (subscriberId: string) => {
    try {
      await axios.delete(`${urlServer}/subscribers/${subscriberId}`, {
        data: {
          subscriberId,
        },
      });
    } catch (error) {}
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${urlServer}/subscribers`);
      setDataSubs(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [dataSubs]);

  return (
    <Row gutter={[8, 8]}>
      <Col span={12}>
        <Card>
          <Typography.Title
            style={{ textAlign: "center", marginTop: 0 }}
            level={2}
          >
            Subscribers
          </Typography.Title>
          <Table style={{ width: "100%" }} dataSource={dataSubs}>
            <Column
              title="Subscriber"
              key="subscriberId"
              dataIndex="subscriberId"
            />
            <Column
              title="Action"
              render={(_: any, record: subsType) => (
                <Space key={record._id}>
                  <Button
                    style={{ border: "none" }}
                    onClick={() => handleShow(record.subscriberId)}
                  >
                    <EyeOutlined />
                  </Button>
                  <Button
                    style={{ border: "none" }}
                    onClick={() => {
                      handleDelete(record.subscriberId);
                    }}
                  >
                    <DeleteOutlined />
                  </Button>
                </Space>
              )}
            />
          </Table>
        </Card>
      </Col>
      {dataSub ? (
        <Col span={12}>
          <Card style={{ height: 650 }}>
            <Typography.Title
              style={{ textAlign: "center", marginTop: 0 }}
              level={2}
            >
              Subscriber
            </Typography.Title>

            {Object.values(dataSub).map((data) => (
              <Space.Compact key={data._id} direction="vertical">
                <NovuProvider
                  subscriberId={data.subscriberId}
                  applicationIdentifier={applicationId}
                  initialFetchingStrategy={{
                    fetchNotifications: true,
                    fetchUserPreferences: true,
                  }}
                >
                  <PopoverNotificationCenter colorScheme={"light"}>
                    {({ unseenCount }) => (
                      <NotificationBell unseenCount={unseenCount} />
                    )}
                  </PopoverNotificationCenter>
                </NovuProvider>
                <Typography.Text>
                  Subscriber ID: {data.subscriberId}
                </Typography.Text>
                <Typography.Text>First Name: {data.firstName}</Typography.Text>
                <Typography.Text>Last Name: {data.lastName}</Typography.Text>
                <Typography.Text>Email: {data.email}</Typography.Text>
                <Typography.Text>Phone: {data.phone}</Typography.Text>
                <NovuProvider
                  subscriberId={data.subscriberId}
                  applicationIdentifier={applicationId}
                  initialFetchingStrategy={{
                    fetchNotifications: true,
                    fetchOrganization: true,
                    fetchUnseenCount: true,
                    fetchUserPreferences: true,
                  }}
                >
                  <UseNotifications />
                </NovuProvider>
              </Space.Compact>
            ))}
          </Card>
        </Col>
      ) : (
        <Empty />
      )}
    </Row>
  );
};

export default ShowAllSubscribers;
