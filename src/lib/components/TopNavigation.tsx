"use client";

import React from "react";
import styled from "styled-components";
import { BackIcon } from "./atoms/Icons";
import { useRouter } from "next/navigation";

interface TopNavigationProps {
  title?: string;
  rightIcon?: React.ReactNode;
}
export default function TopNavigation({
  title = "",
  rightIcon = "",
}: TopNavigationProps) {
  const router = useRouter();

  const handleBackButton = () => {
    router.back();
  };

  return (
    <TopNavigationContainer>
      <BackButtonContainer onClick={handleBackButton}>
        <BackIcon />
      </BackButtonContainer>
      <h1>{title}</h1>
      <RightIconContainer>{rightIcon}</RightIconContainer>
    </TopNavigationContainer>
  );
}

const TopNavigationContainer = styled.nav`
  position: sticky;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: start;
  justify-content: space-between;
  padding: 1rem 0;
  background-color: white;
`;

const BackButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  & svg {
    color: #999999;
    &:hover {
      color: #686868;
    }
  }
`;

const RightIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  & svg {
    color: #999999;
    &:hover {
      color: #686868;
    }
  }
`;
