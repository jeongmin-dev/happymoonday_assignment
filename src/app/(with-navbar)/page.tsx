"use client";

import Header from "@/lib/components/atoms/Header";
import { SearchIcon } from "@/lib/styles/Icons";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

export default function Home() {
  return (
    <section>
      <Header title="서울시립미술관" />
      <HomeContent>
        <p>작품을 검색해보세요</p>
        <SearchButton href="/search">
          <SearchIcon />
          소장품 검색
        </SearchButton>
      </HomeContent>
    </section>
  );
}

const HomeContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  height: calc(100vh - 128px);
  & > p {
    color: #686868;
  }
`;

const SearchButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #f7f7f7;
  font-size: 1rem;
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
