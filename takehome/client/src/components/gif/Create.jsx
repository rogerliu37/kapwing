import React, { useState } from "react";
import gifStyles from "./GifPreview.module.scss";
import styles from "../grayscale/Create.module.scss";
const CreateButton = (props) => {
  const [loading, setLoading] = useState(false);
  const [gif, setGif] = useState(undefined);

  // generates the GIF
  const create = () => {
    // stores passed in data from frontend
    const body = {
      urls: props.urls,
      pictureInterval: props.pictureInterval,
    };

    // updates initial loading status/gif
    setLoading(true);
    setGif(undefined);

    // calls the backend
    fetch("/api/gif", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(body),
    })
      // updates based on backend results
      .then((res) => res.json())
      .then(
        (res) => {
          setGif(res.result);
          setLoading(false);
        },
        (error) => {
          console.log("An error occurred:", error);
          setGif(undefined);
          setLoading(false);
        }
      );
  };

  // renders the final GIF
  const renderFinalGif = () => {
    // edge case
    if (!gif) return null;
    else
      return (
        <>
          <div className={styles.header}>Final GIF:</div>
          <img src={gif} alt="GIF" className={gifStyles.size}/>
        </>
      );
  };

  return (
    <div className={styles.container}>
      {loading ? (
        "Loading ..."
      ) : (
        <input type="button" value="Generate GIF" onClick={create} />
      )}
      {renderFinalGif()}
    </div>
  );
}

export default CreateButton;
