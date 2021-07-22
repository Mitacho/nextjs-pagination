import React from "react";

interface Props {
  isActive: boolean;
  content: string | JSX.Element;
  onClick: () => void;
};

export default function NavigationButton({ isActive, content, onClick }: Props): JSX.Element {
  const [ isHover, setIsHover ] = React.useState<boolean>(false);
  const [ isFocused, setIsFocused ] = React.useState<boolean>(false);

  return(
    <button
      style={{
        ...buttonCSS,
        ...(isHover ? buttonHoverCSS : null),
        ...(isFocused ? buttonFocusedCSS : null),
        ...(isActive ? buttonHoverCSS: null),
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHover(!isHover)}
      onMouseLeave={() => setIsHover(!isHover)}
      onFocus={() => setIsFocused(true)}
    >
      {content}
    </button>
  );  
};

const buttonCSS: React.CSSProperties = {
  minHeight: "2rem",
  minWidth: "2rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  padding: "0.25rem",
  margin: "0 0.25rem",

  backgroundColor: "var(--bg-accent)",
  color: "var(--light-gray)",

  fontSize: "1rem",
  fontWeight: 500,

  borderRadius: "0.25rem",

  cursor: "pointer",

  transition: "background 200ms",
};

const buttonHoverCSS: React.CSSProperties = {
  backgroundColor: "var(--blue)",
  color: "var(--white)",
};

const buttonFocusedCSS: React.CSSProperties = {
  backgroundColor: "var(--bg-accent)",
  color: "var(--light-gray)",
};