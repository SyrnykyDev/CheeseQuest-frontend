import React, { ReactNode } from "react";

// *** STYLES ***
import styles from "./MotionWrapper.module.scss";

const MotionWrapper = ({
  active,
  children,
  style,
}: {
  active?: boolean;
  children: ReactNode;
  style?: any;
}) => {
  return (
    <div className={styles.motionWrapper} style={style}>
      {children}
    </div>
  );
};

export default MotionWrapper;
