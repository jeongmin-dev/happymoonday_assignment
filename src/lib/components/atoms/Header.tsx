"use client";

import React from "react";
import styled from "styled-components";

export default function Header({ title }: { title: string }) {
  return (
    <HeaderContainer>
      <HeaderTitle>{title}</HeaderTitle>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  padding: 1rem;
`;

const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
`;
