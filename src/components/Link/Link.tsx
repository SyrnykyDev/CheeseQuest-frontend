import React, { ReactNode } from "react";
import styles from "./Link.module.scss";
import { Link as ReactLink } from "react-router";

interface LinkProps {
  href: string;
  label?: string;
  children: ReactNode;
  style?: any;
  className?: any;
  onClick?: any;
  disabled?: boolean;
}

const Link = ({
  href,
  children,
  label,
  style,
  className,
  onClick,
  disabled,
}: LinkProps) => {
  const onHandleClick = () => {
    onClick && onClick();
  };
  return (
    <div className={`${styles.link} ${className}`} onClick={onHandleClick}>
      <ReactLink
        to={disabled ? "#" : `${href}`}
        style={{ ...style, cursor: disabled ? "not-allowed" : "pointer" }}
      >
        {children || label}
      </ReactLink>
    </div>
  );
};

export default Link;
