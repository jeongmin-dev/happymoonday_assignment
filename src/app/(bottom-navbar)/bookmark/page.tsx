"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { atom, useAtomValue } from "jotai";
import styled from "styled-components";
import ItemCard from "@/lib/components/ItemCard";
import Button from "@/lib/components/atoms/Button";
import Header from "@/lib/components/atoms/Header";
import { SearchIcon } from "@/lib/components/atoms/Icons";
import { Item } from "@/lib/services/apis/search.types";

export interface BookmarkItem extends Item {
  isBookmark: boolean;
}

export const bookmarkAtom = atom<BookmarkItem[]>([]);

export default function Bookmark() {
  const router = useRouter();
  const bookmarks = useAtomValue(bookmarkAtom);

  const handleItemCard = (item: Item) => {
    router.push(`/collection/${item.manage_no_year}-${item.prdct_nm_korean}`);
  };

  return (
    <section>
      <Header title="즐겨찾기" />
      <BookmarkContent>
        <Subtitle>소장품</Subtitle>
        {bookmarks.length > 0 ? (
          <ItemContainer>
            {bookmarks.map((item, index) => (
              <ItemCard
                key={index}
                item={item}
                onClick={() => handleItemCard(item)}
              />
            ))}
          </ItemContainer>
        ) : (
          <EmptyContainer>
            <p>즐겨찾기한 작품이 없습니다.</p>
            <Button onClick={() => router.push("/search")}>
              <SearchIcon />
              소장품 검색
            </Button>
          </EmptyContainer>
        )}
      </BookmarkContent>
    </section>
  );
}

const BookmarkContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
`;

const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  width: 100%;
  p {
    text-align: center;
    color: #686868;
  }
`;

const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(10rem, 1fr));
  gap: 1.25rem;
  overflow-y: auto;
  width: 100%;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Subtitle = styled.h2`
  width: 100%;
  font-size: 1.125rem;
  font-weight: 600;
  color: #686868;
  background-color: #ffffff;
`;
