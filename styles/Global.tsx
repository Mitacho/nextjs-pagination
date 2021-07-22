import React from "react";

export default function GlobalStyles(): JSX.Element {
  return(
    <style global jsx>{`
      :root {
        --bg: #18191A;
        --bg-accent: #242526;
        --gray: #3A3B3C;
        --light-gray: #B0B3B8;
        --white: #E4E6EB;
        --blue: #1778F2;
      }

      *,
      *:after,
      *:before {
        margin: 0;
        padding: 0;

        box-sizing: border-box;
      }

      html, body {
        height: 100%;
        width: 100%;
        
        background-color: var(--bg);
      }

      *, input, button {
        border: 0;
        outline: 0;

        background: none;

        color: var(--white);

        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

        -webkit-tap-highlight-color: rgba(0,0,0,0);
        -webkit-tap-highlight-color: transparent;
      }

      a {
        text-decoration: none;
      }

      ul {
        list-style: none;
      }
    `}</style>
  );
};