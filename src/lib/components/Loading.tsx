"use client";

import React from "react";
import styled from "styled-components";

export default function Loading() {
  return (
    <LoadingContainer>
      <LoadingIcon />
    </LoadingContainer>
  );
}

const LoadingContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  position: absolute;
  top: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const LoadingIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  background: linear-gradient(0deg, rgba(104, 104, 104, 0.2) 33%, #686868 100%);
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  &::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: #ffffff;
  }
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
