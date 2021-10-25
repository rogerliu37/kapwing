import React, { useState } from "react";
import styles from "./Create.module.scss";

const CreateButton = (props) => {
  const { url } = props;
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(undefined);

  const create = () => {
    const body = {
      url,
    };

    setLoading(true);
    setImage(undefined);

    fetch("/api/grayscale", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          const { grayscaledImage } = result;
          setImage(grayscaledImage);
          setLoading(false);
        },
        (error) => {
          console.log("An error occurred:", error);
          setLoading(false);
        }
      );
  };

  const renderFinalImage = () => {
    if (!image) return null;
    return (
      <>
        <div className={styles.header}>Final image:</div>
        <img src={image} alt="Grayscale Final" className={styles.image} />
      </>
    );
  };

  return (
    <div className={styles.container}>
      {loading ? (
        "Loading ..."
      ) : (
        <input type="button" value="Make image grayscale" onClick={create} />
      )}
      {renderFinalImage()}
    </div>
  );
};

export default CreateButton;
