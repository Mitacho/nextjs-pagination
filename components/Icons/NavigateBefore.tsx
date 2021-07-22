import React from "react";

interface Props {
  fill: string;
  height: string;
  width: string;
}

export default function NavigateBeforeIcon({ fill, height, width }: Props): JSX.Element {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" height={height} viewBox="0 0 24 24" width={width} fill={fill}>
      <path d="M0 0h24v24H0V0z" fill="none"/>
      <path d="M15.61 7.41L14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z"/>
    </svg>
  );
};