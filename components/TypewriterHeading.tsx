"use client";
import React, { useState, useEffect } from "react";

interface TypewriterProps {
  text: string;
}

const Typewriter: React.FC<TypewriterProps> = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const typingSpeed = 150; // Typing speed in ms

  useEffect(() => {
    setDisplayText(""); // Reset on re-render
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayText((prev) => prev + text.charAt(index)); // Append letter correctly
        index++;
      } else {
        clearInterval(typingInterval); // Stop the interval completely
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval); // Cleanup on unmount
  }, [text]);

  return (
    <h1 style={styles.heading}>
      {displayText}
      <span style={styles.cursor}>|</span>
    </h1>
  );
};

const styles = {
  heading: {
    color: "white",
    fontFamily: "monospace",
    fontSize: "3rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    borderRight: "2px solid orange", // Typewriter effect
    paddingRight: "5px",
  },
  cursor: {
    display: "inline-block",
    width: "0.5rem",
    animation: "blink 1s infinite",
  },
};

// Add global CSS for blinking cursor animation
if (typeof window !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.innerHTML = `
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
  `;
  document.head.appendChild(styleSheet);
}

export default Typewriter;
