"use client";

import React from "react";
import styled from "styled-components";

interface TextFieldProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: string) => void;
}

export default function TextField({
  type = "text",
  placeholder = "",
  value,
  onChange,
}: TextFieldProps) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => handleInput(e)}
    />
  );
}

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: none;
  outline: none;
  font-size: 1rem;
  &::placeholder {
    color: #c9c9c9;
  }
`;
