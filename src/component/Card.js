import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  let index = props.shoes[props.i].id;
  return (
    <div className="col-md-4">
      <Link to={`/detail/${index}`}>
        <img
          alt="사진"
          src={`https://codingapple1.github.io/shop/shoes${index + 1}.jpg`}
          width="80%"
        />
      </Link>

      <h4>{props.shoes[props.i].title}</h4>
      <p>{props.shoes[props.i].price}</p>
    </div>
  );
};
export default Card;
