import React from 'react';
import { notification } from 'antd';
import type { NotificationArgsProps } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotificationCPProps {
  message: string;
  type: NotificationType;
  placement?: NotificationArgsProps['placement'];
  description?: string;
}

const NotificationCP: React.FC<NotificationCPProps> = ({
  message,
  type,
  placement = 'topRight',
  description,
}) => {
  const [api, contextHolder] = notification.useNotification();

  React.useEffect(() => {
    if (message) {
      api[type]({
        message,
        description,
        placement,
      });
    }
  }, [message, type, placement, description, api]);

  return <>{contextHolder}</>;
};

export default NotificationCP;