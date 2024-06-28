"use client";

import React from "react";
import styled from "styled-components";

interface ButtonProps {
  size?: "s" | "m" | "l";
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

export default function Button({
  size = "l",
  fullWidth = false,
  children,
  onClick,
}: ButtonProps) {
  return (
    <ButtonContainer
      size={size}
      fullwidth={fullWidth.toString()}
      onClick={onClick}
    >
      {children}
    </ButtonContainer>
  );
}

const ButtonContainer = styled.button<{ fullwidth: string; size: string }>`
  width: ${(props) => (props.fullwidth === "true" ? "100%" : "auto")};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: ${(props) => (props.size === "s" ? "0.5rem 1rem" : "1rem")};
  background-color: #f7f7f7;
  color: #000000;
  text-decoration: none;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #f2f2f2;
  }
`;
