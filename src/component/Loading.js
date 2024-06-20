import React from "react";
import Pack from "./assets/Bean Eater-1s-200px.gif";
import "../App.css";

const Loading = () => {
  return (
    <div className="LoadingBox">
      <div className="alert alert-light">
        <img alt="로딩중" src={Pack} width={"5%"} />
        로딩중입니다.
      </div>
    </div>
  );
};

export default Loading;
