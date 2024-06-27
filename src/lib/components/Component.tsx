"use client";

import React from "react";
import styled from "styled-components";

export default function Component({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #fafafa;
`;

const Container = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 26.875rem;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
`;
