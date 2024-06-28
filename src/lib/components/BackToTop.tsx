"use client";

import React from "react";
import styled from "styled-components";
import { UpIcon } from "./atoms/Icons";

export default function BackToTop() {
  const [showButton, setShowButton] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    const scrollStep = window.scrollY / (0.17 * 60);

    const scrollAnimation = () => {
      if (window.scrollY > 0) {
        window.scroll(0, window.scrollY - scrollStep);
        requestAnimationFrame(scrollAnimation);
      }
    };

    scrollAnimation();
  };

  return (
    showButton && (
      <FloatingButton onClick={handleClick}>
        <UpIcon />
      </FloatingButton>
    )
  );
}

const FloatingButton = styled.button`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  border: none;
  border-radius: 50%;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  cursor: pointer;
  &:hover {
    background-color: #f7f7f7;
  }
`;
