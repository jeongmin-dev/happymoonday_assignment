"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { atom, useAtom } from "jotai";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components";
import Loading from "@/lib/components/Loading";
import ItemCard from "@/lib/components/ItemCard";
import TopNavigation from "@/lib/components/TopNavigation";
import YearSort from "@/lib/components/search/YearSort";
import SearchBar from "@/lib/components/search/SearchBar";
import SearchDialog from "@/lib/components/search/SearchDialog";
import Button from "@/lib/components/atoms/Button";
import { getItems } from "@/lib/services/apis/search";
import { Item } from "@/lib/services/apis/search.types";

export interface SearchValueType {
  value: string;
  label: string;
}

export const searchAtom = atom({
  startIdx: 0,
  endIdx: 100,
  category: "",
  year: "",
  title: "",
});

export const itemDataAtom = atom<Item[]>([]);

export default function Search() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useAtom(searchAtom);
  const [itemData, setItemData] = useAtom(itemDataAtom);
  const [buttonActive, setButtonActive] = React.useState(true);
  const [errorCode, setErrorCode] = React.useState<string>("");
  const [openDialog, setOpenDialog] = React.useState(false);

  const { data, isLoading, isFetching, isRefetching, fetchNextPage } =
    useInfiniteQuery(["search"], () => getItems(search), {
      enabled:
        searchParams.has("title") && search.title === searchParams.get("title"),
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      retry: 3,
      getNextPageParam: (lastPage) => {
        if (!lastPage) return undefined;

        if (lastPage.RESULT) {
          if (lastPage.RESULT.CODE === "INFO-200") {
            return undefined;
          }
        } else {
          if (lastPage.SemaPsgudInfoKorInfo.list_total_count > 0) {
            return lastPage.SemaPsgudInfoKorInfo.list_total_count;
          } else {
            return undefined;
          }
        }
      },
      onSuccess: (data) => {
        if (data.pages[data.pageParams.length - 1].RESULT) {
          if (
            data.pages[data.pageParams.length - 1].RESULT.CODE === "INFO-200"
          ) {
            setErrorCode(data.pages[data.pageParams.length - 1].RESULT.CODE);
            setItemData([]);
            return;
          }
        } else {
          if (
            data.pages[data.pageParams.length - 1].SemaPsgudInfoKorInfo.row
              .length > 0
          ) {
            const newItems = itemData.concat(
              data.pages[data.pageParams.length - 1].SemaPsgudInfoKorInfo.row
            );
            const result = newItems.sort((a, b) => {
              return Number(a.mnfct_year) - Number(b.mnfct_year);
            });

            setSearch({
              ...search,
              startIdx: newItems.length + 1,
              endIdx: newItems.length + 101,
            });

            setItemData(result);
            setButtonActive(false);
          } else {
            setItemData([]);
          }
        }
      },
    });

  React.useEffect(() => {
    if (search.title !== "") {
      fetchNextPage({ pageParam: 0 });
    }

    if (searchParams.has("title")) {
      const title = searchParams.get("title") as string;
      setSearch({ ...search, title });
    }

    return () => {
      setSearch({
        startIdx: 0,
        endIdx: 100,
        category: "",
        year: "",
        title: "",
      });
      setItemData([]);
    };
  }, []);

  React.useEffect(() => {
    if (search.title === "" || search.title === undefined) {
      setErrorCode("");
    }
  }, [search.title]);

  const observer = React.useRef<IntersectionObserver>();

  const lastElementRef = React.useCallback(
    (node: HTMLDivElement) => {
      if (node && !isFetching) {
        if (observer.current) observer.current.disconnect();
        const hasNext =
          data &&
          data?.pages[data.pageParams.length - 1].SemaPsgudInfoKorInfo.row
            .length >= 100;

        observer.current = new IntersectionObserver((entries) => {
          if (entries[0]?.isIntersecting && !isFetching && hasNext) {
            fetchNextPage();
          }
        });

        observer.current.observe(node);
      }
    },
    [isFetching, fetchNextPage, data]
  );

  const handleSearch = () => {
    if (search.title === "" || search.title === undefined) {
      setOpenDialog(true);
      return;
    }
    router.replace(`${pathName}?title=${search.title}`);
    fetchNextPage({ pageParam: 0 });
  };

  const handleItemCard = (item: Item) => {
    router.push(`/collection/${item.manage_no_year}-${item.prdct_nm_korean}`);
  };

  return (
    <SearchContainer>
      <SearchHeader>
        <TopNavigation />
        <SearchBar onSearch={handleSearch} />
      </SearchHeader>
      <SearchContent>
        {(isLoading || isRefetching) && <Loading />}
        <SearchResultContent>
          {itemData && itemData.length > 0 && <YearSort />}
          {itemData && itemData.length > 0 ? (
            <ItemContainer>
              {itemData.map((item, index) => (
                <ItemCard
                  key={index}
                  ref={
                    index === itemData.length - 1 ? lastElementRef : undefined
                  }
                  item={item}
                  onClick={() => handleItemCard(item)}
                />
              ))}
            </ItemContainer>
          ) : (
            <EmptyContainer>
              {errorCode === "INFO-200" ? (
                <ErrorContainer>
                  <h5>
                    <span>{`'${searchParams.get("title")}'`}</span>에 대한 검색
                    결과가 없어요
                  </h5>
                  <p>{`다른 검색어를 입력하거나\n철자와 띄어쓰기를 확인해보세요.`}</p>
                </ErrorContainer>
              ) : (
                <p>작품 제목 또는 단어로 검색할 수 있어요.</p>
              )}
            </EmptyContainer>
          )}
        </SearchResultContent>
        <SearchButtonContainer hide={buttonActive.toString()}>
          <Button onClick={handleSearch} fullWidth>
            검색하기
          </Button>
        </SearchButtonContainer>
      </SearchContent>
      {openDialog && <SearchDialog open={openDialog} setOpen={setOpenDialog} />}
    </SearchContainer>
  );
}

const SearchContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  height: 100vh;
`;

const SearchHeader = styled.div`
  position: sticky;
  top: 0;
  bottom: 0;
  z-index: 100;
  background-color: #ffffff;
`;

const SearchContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem 0;
  height: inherit;
`;

const SearchResultContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: calc(100vh - 160px);
  overflow: hidden;
`;

const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6.25rem 0;
  color: #c9c9c9;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  h5 {
    color: #000000;
    font-size: 1.125rem;
    font-weight: 600;
    span {
      color: #686868;
    }
  }
  p {
    color: #c9c9c9;
    text-align: center;
    white-space: pre-line;
  }
`;

const SearchButtonContainer = styled.div<{ hide?: string }>`
  display: ${({ hide }) => (hide === "true" ? "block" : "none")};
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 26.875rem;
  padding: 1rem;
  background-color: #ffffff;
`;

const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(10rem, 1fr));
  gap: 1.25rem;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
