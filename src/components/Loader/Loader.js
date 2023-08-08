import React from "react";
import "./loader.css";

const Loader = () => {
  return (
      <div style={{
          height: "100%",
          width: "100%",
          background: "rgba(0,0,0,.1)",
          backdropFilter: "blur(4px)",
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
      }}>
          <div style={{
              height: "80%",
              aspectRatio: "1",
              border: "6px solid #5c61f2",
              borderLeftColor: "transparent",
              borderBottomColor: "transparent",
              maxHeight: "100px",
              borderRadius: "100%"
          }} className="loader-animation"></div>
      </div>
  )
}
export default Loader;
