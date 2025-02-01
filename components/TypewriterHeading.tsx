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
    <h1 className="text-white font-mono whitespace-nowrap overflow-hidden pr-2  text-[2rem] lg:text-[3rem]">
      {displayText}
      <span className="inline-block w-2 animate-blink">|</span>
    </h1>
  );
};

// Add global CSS for blinking cursor animation in Tailwind
if (typeof window !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.innerHTML = `
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .animate-blink {
      animation: blink 1s infinite;
    }
  `;
  document.head.appendChild(styleSheet);
}

export default Typewriter;
