import React from "react";

export const Total = ({ parts }) => {
  let sum = parts.reduce((total, part) => total + part.exercises, 0);
  console.log(sum);
  return <p>Number of exercises {sum} </p>;
};
