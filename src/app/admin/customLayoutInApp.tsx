import { DeleteOutlined } from "@ant-design/icons";
import {
  useNotifications,
  useRemoveNotification,
} from "@novu/notification-center";
import { Button, Space, Typography } from "antd";
import Card from "antd/es/card/Card";

export const UseNotifications = () => {
  const { notifications, isFetching, isLoading } = useNotifications();

  const { removeNotification } = useRemoveNotification({});

  const handleRemoveMessage = (messageId: any) => {
    removeNotification({ messageId });
  };

  return (
    <>
      <Typography.Title level={3}> Custom notification in-app</Typography.Title>
      {isLoading && <div>loading ....</div>}
      {isFetching && <div>fetching ....</div>}
      {!isFetching &&
        notifications?.map((item: any, index) => {
          return (
            <Card bodyStyle={{ padding: 0, marginLeft: 8, marginBottom: 4 }}>
              <Space>
                <Typography.Text>
                  {index + 1} {item?.content}
                </Typography.Text>
                <Button
                  style={{ border: "none" }}
                  onClick={() => handleRemoveMessage(item?._id)}
                >
                  <DeleteOutlined />
                </Button>
              </Space>
            </Card>
          );
        })}
    </>
  );
};
