import styles from "./Notification.module.scss";
import { INotification } from "./INotification.ts";
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";

interface NotificationProps extends INotification {
  onDelete: any;
}

const Notification = ({ id, type, message, onDelete }: NotificationProps) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, 50);
    setTimeout(() => {
      setActive(false);
      setTimeout(() => {
        onDelete(id);
      }, 8000);
    }, 4000);
  }, []);
  return (
    <AnimatePresence initial={false}>
      {active ? (
        <motion.div
          exit={{ opacity: 0, scale: 0 }}
          // style={box}
          key="box"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`${styles.notification} ${styles["notification_" + type]}`}
          onClick={() => setActive(false)}
        >
          <div>{message}</div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Notification;
