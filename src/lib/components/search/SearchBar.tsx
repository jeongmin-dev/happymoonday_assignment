"use client";

import React from "react";
import styled from "styled-components";
import TextField from "../atoms/TextField";
import { CancelIcon, SearchIcon } from "@/lib/components/atoms/Icons";
import { searchAtom } from "@/app/(top-navbar)/search/page";
import { useAtomValue, useSetAtom } from "jotai";
import { usePathname, useRouter } from "next/navigation";

interface SearchBarProps {
  onSearch: () => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const router = useRouter();
  const pathName = usePathname();
  const searchValue = useAtomValue(searchAtom);
  const setSearchValue = useSetAtom(searchAtom);

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (searchValue.title === "" || searchValue.title === undefined) {
        alert("검색어를 입력해주세요.");
        return;
      }
      router.replace(`${pathName}?title=${searchValue.title}`);
      onSearch();
    } else {
      return;
    }
  };

  const handleInput = (text: string) => {
    setSearchValue({ ...searchValue, title: text });
  };

  const handleClear = () => {
    setSearchValue({ ...searchValue, title: "" });
  };

  return (
    <SearchBarContainer onKeyDown={handleOnKeyDown}>
      <IconContainer>
        <SearchIcon />
      </IconContainer>
      <TextField
        placeholder="검색어를 입력하세요"
        value={searchValue.title}
        onChange={(text) => handleInput(text)}
      />
      {searchValue.title && (
        <IconContainer onClick={handleClear}>
          <CancelIcon />
        </IconContainer>
      )}
    </SearchBarContainer>
  );
}

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;
  color: #c9c9c9;
  background-color: #ffffff;
  &:hover {
    border-color: #c9c9c9;
  }
  &:focus-within {
    border-color: #686868;
    color: #686868;
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
