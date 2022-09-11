import React from "react";
import styles from "./RibbonTopLeft.module.scss";

const RibbonTopLeft = (props) => {
  const { text } = props;

  return (
    <div className={styles.box = " h-full"}>
      <div className={styles.ribbon + " " + styles.ribbontopleft}>
        <span>{text}</span>
      </div>
      {props.children}
    </div>
  );
};

export default RibbonTopLeft;
