import React from "react";
import { Image } from "react-native";

const PhotoThumbnail = ({ uri, width, height }) => {
  return (
    <Image
      source={{ uri }}
      style={{
        width,
        height,
        borderWidth: 0.5,
        borderColor: "#d3d3d3",
        borderRadius: width / 2,
      }}
    />
  );
};

export default PhotoThumbnail;
