import React, { useRef, useEffect } from "react";
import styles from "../grayscale/Preview.module.scss";
import gifStyles from "./GifPreview.module.scss";

function GifPreview(props) {
  /*
  have an array of pictures
  1. need to iterate through them
      a. animateGif() begins the iteration
      b. changePicture() iterates through the array
  2. need to stop the iteration when the DOM changes
  */
  const currentPictureIndex = useRef(0);
  const interval = useRef(null);

  const changePicture = () => {
    document.getElementById("preview").src =
      props.urls[currentPictureIndex.current];
    // increments picture index or sets to zero if out of range
    currentPictureIndex.current =
      currentPictureIndex.current + 1 >= props.urls.length
        ? 0
        : currentPictureIndex.current + 1;
  };

  const animateGif = () => {
    clearInterval(interval.current);
    // set the initial interval between calls to changePicture in number of ms
    interval.current = setInterval(changePicture, props.pictureInterval);
  };

  // starts the animation
  animateGif();


  // Returns the clearInterval method
  // interval is leared and no longer triggers every second after the component unmounts from the DOM.
  useEffect(() => {
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>GIF Preview:</div>
      <div className={gifStyles.container}>
        <img id="preview" className={gifStyles.size} />
      </div>
    </div>
  );
}

export default GifPreview;
