import React from "react";

interface Props {
  fill: string;
  height: string;
  width: string;
}

export default function LastPageIcon({ fill, height, width }: Props): JSX.Element {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" height={height} viewBox="0 0 24 24" width={width} fill={fill}>
      <path d="M0 0h24v24H0V0z" fill="none"/>
      <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"/>
    </svg>
  );
};