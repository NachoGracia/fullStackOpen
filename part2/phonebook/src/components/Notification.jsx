import "./Notification.css";
export const NotificationOk = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="confirmed">{message}</div>;
};

export const NotificationError = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};
