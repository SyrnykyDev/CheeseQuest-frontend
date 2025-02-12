import React, {ButtonHTMLAttributes, HTMLAttributes, useEffect} from "react";

// *** STYLES ***
import styles from "./Button.module.scss";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement>{
  buttonType?: "sans" | "round";
  buttonColor?: "green" | "blue" | "orange" | "gray";
  active?: boolean;
}

const Button = (props: ButtonProps) => {
  const {
    children,
    active,
    buttonType = "sans",
    buttonColor = "green",
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
        {children}
      </button>
    </div>
  );
};

export default Button;
