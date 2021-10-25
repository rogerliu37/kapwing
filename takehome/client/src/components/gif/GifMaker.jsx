import React, { useState } from "react";
import Upload from "components/upload/Upload.jsx";
import styles from "./GifMaker.module.scss";
import GifPreview from "./GifPreview.jsx";
import CreateGif from "./Create.jsx";

const GifMaker = () => {
  // uses the useState function so values are preserved between function calls
  const [pictureInterval, setPictureInterval] = useState(500);
  const [urls, setUrls] = useState([]);

  // adds the uploaded url to the urls array
  const handleFinish = (uploadedUrl) => {
    console.log("Upload complete!", uploadedUrl);
    setUrls((storedUrls) => [...storedUrls, uploadedUrl]);
  };

  return (
    <div className={styles.container}>
      <h2>Create a GIF</h2>
      <div>
        This tool allows a user to upload images, see a preview of their GIF,
        and convert those images into a GIF montage!
      </div>

      {/* handles image upload */}
      <Upload handleFinish={handleFinish} />

      {/* GIF maker implementation should start here */}
      {urls.length > 0 ? ( // check to make sure there are values 
        <>
          <GifPreview urls={urls} pictureInterval = {pictureInterval} />
          <CreateGif urls={urls} pictureInterval = {pictureInterval} />
        </>
      ) : null}
    </div>
  );
};

export default GifMaker;
