"use client";

import React from "react";
import styled from "styled-components";

interface BodyProps {
  children: React.ReactNode;
}

export default function Body({ children }: BodyProps) {
  return (
    <BodyContainer>
      <Text>{children}</Text>
    </BodyContainer>
  );
}

const BodyContainer = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

const Text = styled.h5`
  font-size: 1rem;
  color: #686868;
  font-weight: 500;
  margin: 0;
`;
