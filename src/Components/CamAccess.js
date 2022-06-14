import React, { useRef, useState } from "react";
// import CameraAltRoundedIcon from "@material-ui/icons/CameraAltRounded";

// import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
function CamAccess() {
  const [isShowVideo, setIsShowVideo] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(false);
  let videoRef = useRef(null);

  let photoRef = useRef(null);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        // video: true,
        video: {
          width: {
            min: 1280,
            ideal: 1920,
            max: 2560,
          },
          height: {
            min: 720,
            ideal: 1080,
            max: 1440,
          },
          facingMode: "user",
          // {
          //   exact: "environment",
          // },
        },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
        console.log(hasPhoto);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const takePicture = () => {
    setHasPhoto(true);
    const width = 200;
    const height = 200;

    let video = videoRef.current;

    let photo = photoRef.current;

    photo.width = width;

    photo.height = height;

    let ctx = photo.getContext("2d");

    ctx.drawImage(video, 0, 0, width, height);
    setIsShowVideo(true);
    console.log(video);
    console.log(photo);
    console.log(hasPhoto);
  };

  const clearImage = () => {
    // let photo = photoRef.current;

    // let ctx = photo.getContext("2d");

    // ctx.clearRect(0, 0, photo.width, photo.height);
    let video = videoRef.current;

    // video.stop()
    video.pause();
    video.src = "";
    // setIsShowVideo(false);
    console.log(hasPhoto);
  };

  return (
    <div className="container">
      <div style={{ display: "flex", flexDirection: "wrap" }}>
        {!hasPhoto ? (
          <ImageContainer onClick={getVideo}>
            <p style={{ marginTop: "80px" }}>Add image </p>
          </ImageContainer>
        ) : (
          <div>
            <Canvas className="container" ref={photoRef}></Canvas>
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "400px",
          height: "325px",
          marginLeft: "34%",
        }}
      >
        <Video ref={videoRef} className="container"></Video>
        <div>
          <button onClick={takePicture}>Take Picture</button>
          <button onClick={clearImage}>Go back</button>
        </div>
      </div>
    </div>
  );
}
const Canvas = styled.canvas`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  margin-left: 675px;
  text-align: center;
  margin-top: 20px;
`;
const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  background-color: pink;
  margin-top: 20;
  margin-left: 675px;
  text-align: center;
  border-radius: 100px;
`;
const Video = styled.video`
  width: 300px;
  height: 300px;
  margin-left: 105px;
`;

export default CamAccess;
