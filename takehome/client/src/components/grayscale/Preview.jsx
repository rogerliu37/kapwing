import React from "react";
import styles from "./Preview.module.scss";

const Preview = (props) => {
  const { url } = props;

  return (
    <div className={styles.container}>
      <div className={styles.header}>Preview of grayscaled image:</div>
      <img src={url} alt="Grayscale Preview" className={styles.image} />
    </div>
  );
};

export default Preview;
