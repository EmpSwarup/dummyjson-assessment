import React from "react";
import "./style.css";

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="loader">
        <span className="loader-text">loading</span>
        <span className="load"></span>
      </div>
    </div>
  );
};

export default Loader;
