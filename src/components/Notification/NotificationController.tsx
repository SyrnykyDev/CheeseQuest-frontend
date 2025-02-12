import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import Notification from "./Notification.tsx";
import styles from "./Notification.module.scss";
import { removeNotification } from "../../store/userSlice.ts";

const NotificationController = () => {
  const notifications = useSelector(
    (state: RootState) => state.user.notifications,
  );
  const dispatch = useDispatch();

  return (
    <div className={styles.controller}>
      {notifications.map((elem, index) => (
        <Notification
          key={index}
          {...elem}
          onDelete={(id: any) => dispatch(removeNotification({ id }))}
        />
      ))}
    </div>
  );
};

export default NotificationController;
