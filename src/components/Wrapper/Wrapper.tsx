import React, { ReactNode } from "react";
import Header from "../header/header";
import Footer from "../Footer/Footer";

// *** STYLES ***
import styles from "./wrapper.module.scss";
import NotificationController from "../Notification/NotificationController.tsx";

interface WrapperProps {
  children: ReactNode;
  header?: boolean;
  footer?: boolean;
}

/**
 * This component will appear in every page
 * @param children
 * @param header
 * @param footer
 * @constructor
 */
const Wrapper = ({ children, header = true, footer = true }: WrapperProps) => {
  return (
    <div className={styles.wrapper}>
      {header && <Header />}

      <NotificationController />
      <div className={styles.wrapper_content}>{children}</div>
      {footer && <Footer />}
    </div>
  );
};

export default Wrapper;
