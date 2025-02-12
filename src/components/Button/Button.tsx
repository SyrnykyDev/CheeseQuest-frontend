import React, { ButtonHTMLAttributes, HTMLAttributes, useEffect } from "react";

// *** STYLES ***
import styles from "./Button.module.scss";
import Loader from "../Loader/Loader.tsx";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  buttonType?: "sans" | "round";
  buttonColor?: "green" | "blue" | "orange" | "gray" | "red";
  active?: boolean;
  loading?: boolean;
}

const Button = (props: ButtonProps) => {
  const {
    children,
    active,
    buttonType = "sans",
    buttonColor = "green",
    loading,
    ...otherProps
  } = props;

  let style = "";
  style = `${styles["button_" + buttonType]}`;
  style += ` ${styles["button_" + buttonType + "_" + buttonColor]}`;
  if (active) style += ` ${styles["button_" + buttonType + "__" + "active"]}`;

  return (
    <div>
      {/*@ts-ignore*/}
      <button className={style} {...otherProps}>
        {loading ? <Loader /> : children}
      </button>
    </div>
  );
};

export default Button;
