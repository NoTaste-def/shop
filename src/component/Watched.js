import React, { useEffect } from "react";

const Watched = () => {
  let local = JSON.parse(localStorage.getItem("watched"));

  return (
    <div className="watched-box">
      <h6 className="watched-box-title">최근 본 상품</h6>
      {local.map((a, i) => {
        return (
          <div className="watched-item-image-box" key={i}>
            <img
              className="watched-item-image"
              alt=""
              src={`https://codingapple1.github.io/shop/shoes${
                local[i] + 1
              }.jpg`}
              width={"40%"}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Watched;
