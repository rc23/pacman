import React from "react";
import "./Square.css";

export const Square = square => {
  let classVal = "square";
  const squares = square.map((item, i) => {
    if (item === 0) classVal = "square";
    if (item === 1) classVal = "square wall";
    if (item === 2) classVal = "square dot";

    return <div key={i} className={classVal} />;
  });
  return squares;
};
