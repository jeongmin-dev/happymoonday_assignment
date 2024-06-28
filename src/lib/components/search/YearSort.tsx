"use client";

import React from "react";
import styled from "styled-components";
import { useAtomValue, useSetAtom } from "jotai";
import Button from "../atoms/Button";
import { DownIcon } from "@/lib/components/atoms/Icons";
import { itemDataAtom } from "@/app/(top-navbar)/search/page";

type SortType = "asc" | "desc";

export default function YearSort() {
  const itemData = useAtomValue(itemDataAtom);
  const setItemData = useSetAtom(itemDataAtom);
  const [bottomSheetActive, setBottomSheetActive] = React.useState(false);

  const handleSort = (type: SortType) => {
    const sortedData = [...itemData].sort((a, b) => {
      if (type === "asc") {
        return Number(a.manage_no_year) - Number(b.manage_no_year);
      } else {
        return Number(b.manage_no_year) - Number(a.manage_no_year);
      }
    });

    window.scrollTo({ top: 0, behavior: "auto" });

    setItemData(sortedData);
    setBottomSheetActive(false);
  };

  return (
    <div>
      <Button size="s" onClick={() => setBottomSheetActive(true)}>
        제작연도 오름차순
        <DownIcon />
      </Button>
      {bottomSheetActive && (
        <BottomSheetContainer onClick={() => setBottomSheetActive(false)}>
          <BottomSheetContent>
            <button onClick={() => handleSort("asc")}>제작연도 오름차순</button>
            <button onClick={() => handleSort("desc")}>
              제작연도 내림차순
            </button>
          </BottomSheetContent>
        </BottomSheetContainer>
      )}
    </div>
  );
}

const BottomSheetContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`;

const BottomSheetContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 26.875rem;
  background-color: #ffffff;
  border-radius: 1rem 1rem 0 0;

  button {
    background-color: #ffffff;
    padding: 1rem;
    font-size: 1rem;
    font-weight: 500;
    color: #686868;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
      color: #000000;
    }
  }
`;
