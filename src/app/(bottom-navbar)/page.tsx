"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import Button from "@/lib/components/atoms/Button";
import Header from "@/lib/components/atoms/Header";
import { SearchIcon } from "@/lib/components/atoms/Icons";

export default function Home() {
  const router = useRouter();

  return (
    <section>
      <Header title="서울시립미술관" />
      <HomeContent>
        <Button onClick={() => router.push("/search")}>
          <SearchIcon />
          소장품 검색
        </Button>
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
`;
