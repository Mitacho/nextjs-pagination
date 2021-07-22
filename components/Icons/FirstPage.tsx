import React from "react";

interface Props {
  fill: string;
  height: string;
  width: string;
}

export default function FirstPageIcon({ fill, height, width }: Props): JSX.Element {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" height={height} viewBox="0 0 24 24" width={width} fill={fill}>
      <path d="M24 0v24H0V0h24z" fill="none" opacity=".87"/>
      <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6 1.41-1.41zM6 6h2v12H6V6z"/>
    </svg>
  );
};