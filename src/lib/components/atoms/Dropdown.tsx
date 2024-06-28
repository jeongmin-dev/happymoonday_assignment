"use client";

import { SearchValueType } from "@/app/(top-navbar)/search/page";
import { atom, useSetAtom } from "jotai";
import React from "react";
import styled from "styled-components";

interface DropdownProps {
  values: SearchValueType[];
}

export const selectAtom = atom("title");

export default function Dropdown({ values }: DropdownProps) {
  const setSelect = useSetAtom(selectAtom);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };

  return (
    <DropdownWrapper>
      <DropdownContainer onChange={(e) => handleSelect(e)}>
        {values.map((value) => (
          <option key={value.value} value={value.value}>
            {value.label}
          </option>
        ))}
      </DropdownContainer>
    </DropdownWrapper>
  );
}

const DropdownWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DropdownContainer = styled.select`
  width: 5.25rem;
  border: none;
  outline: none;
  font-size: 1rem;
  &::placeholder {
    color: #c9c9c9;
  }
`;
