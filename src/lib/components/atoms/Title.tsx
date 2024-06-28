"use client";

import React from "react";
import styled from "styled-components";

interface TitleProps {
  children: React.ReactNode;
  size?: "m" | "l";
  color?: string;
  lineClamp?: number;
}

export default function Title({
  children,
  size = "m",
  color = "#000000",
  lineClamp,
}: TitleProps) {
  return (
    <TitleContainer lineclamp={lineClamp}>
      <Text textsize={size} color={color}>
        {children}
      </Text>
    </TitleContainer>
  );
}

const TitleContainer = styled.div<{ lineclamp?: number }>`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${(props) => props.lineclamp};
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Text = styled.h3<{ textsize?: string; color: string }>`
  font-size: ${(props) => (props.textsize === "m" ? "1.125rem" : "1.5rem")};
  color: ${(props) => props.color};
  font-weight: 600;
  margin: 0;
`;
