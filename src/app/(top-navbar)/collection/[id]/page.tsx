"use client";

import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { atom, useAtom } from "jotai";
import { useQuery } from "react-query";
import styled from "styled-components";
import Dialog from "@/lib/components/Dialog";
import Loading from "@/lib/components/Loading";
import TopNavigation from "@/lib/components/TopNavigation";
import Body from "@/lib/components/atoms/Body";
import Title from "@/lib/components/atoms/Title";
import { BookmarkIcon, SolidBookmarkIcon } from "@/lib/components/atoms/Icons";
import { getItems } from "@/lib/services/apis/search";
import { Item } from "@/lib/services/apis/search.types";
import { bookmarkAtom } from "@/app/(bottom-navbar)/bookmark/page";

export const collectionAtom = atom<Item>({
  prdct_cl_nm: "",
  manage_no_year: "",
  prdct_nm_korean: "",
  prdct_nm_eng: "",
  prdct_stndrd: "",
  mnfct_year: "",
  matrl_technic: "",
  prdct_detail: "",
  writr_nm: "",
  main_image: "",
  thumb_image: "",
});

interface BookmarkedProps {
  isBookmarked: boolean;
  onClick: () => void;
}

export default function Collection() {
  const router = useRouter();
  const pathName = usePathname();
  const [year, title] = pathName.split("/")[2].split("-");
  const [collection, setCollection] = useAtom(collectionAtom);
  const [bookmarks, setBookmarks] = useAtom(bookmarkAtom);
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [request, setRequest] = React.useState({
    startIdx: 0,
    endIdx: 30,
    category: "",
    year: "",
    title: "",
  });

  const { isLoading, isFetching, isFetched } = useQuery(
    ["collection", request],
    () => getItems(request),
    {
      enabled: request.title !== "",
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      onSuccess: (data) => {
        const result = data.SemaPsgudInfoKorInfo.row;
        if (result.length > 1) {
          const filtered = result.filter(
            (item) => item.prdct_nm_korean === decodeURI(title)
          );
          setCollection(filtered[0]);
        } else {
          setCollection(result[0]);
        }
      },
    }
  );

  React.useEffect(() => {
    const requestTitle = decodeURI(title).split(" ")[0];
    setRequest({ ...request, year, title: requestTitle });

    const bookmarked = bookmarks.find(
      (item) => item.prdct_nm_korean === decodeURI(title)
    );
    if (bookmarked) {
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }
  }, []);

  const handleBookmarkDialog = () => {
    console.log("handleBookmarkDialog");
    if (isBookmarked) {
      setIsBookmarked(false);
      return;
    }
    setDialogOpen(true);
  };

  const handleBookmark = (isBookmarked: boolean) => {
    if (isBookmarked) {
      setBookmarks([...bookmarks, { ...collection, isBookmark: true }]);
      setIsBookmarked(true);
      router.push("/bookmark");

      return;
    } else {
      setBookmarks(
        bookmarks.filter(
          (bookmark) => bookmark.prdct_nm_korean !== collection.prdct_nm_korean
        )
      );
      setIsBookmarked(false);
    }
  };

  return (
    <CollectionContainer>
      {isLoading && isFetching && <Loading />}
      <CollectionHeader>
        <TopNavigation
          title={collection?.prdct_nm_korean}
          rightIcon={
            <div onClick={handleBookmarkDialog}>
              {isBookmarked ? <SolidBookmarkIcon /> : <BookmarkIcon />}
            </div>
          }
        />
      </CollectionHeader>
      {isFetched && collection && (
        <CollectionContent>
          <ImageContainer>
            {collection.main_image && (
              <Image
                src={collection?.main_image || ""}
                alt={collection?.prdct_nm_korean}
                fill
                sizes="100%"
                priority
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            )}
          </ImageContainer>
          <InfoWrapper>
            <TitleContainer>
              <Title size="l">{collection?.prdct_nm_korean}</Title>
              {collection?.prdct_nm_korean !== collection?.prdct_nm_eng && (
                <Body>{collection?.prdct_nm_eng}</Body>
              )}
            </TitleContainer>
            <InfoContainer>
              <tbody>
                <tr>
                  <td>작가명</td>
                  <td>{collection?.writr_nm}</td>
                </tr>
                <tr>
                  <td>제작연도</td>
                  <td>{collection?.mnfct_year}</td>
                </tr>
                <tr>
                  <td>부문</td>
                  <td>{collection?.prdct_cl_nm}</td>
                </tr>
                <tr>
                  <td>규격</td>
                  <td>{collection?.prdct_stndrd}</td>
                </tr>
                <tr>
                  <td>수집연도</td>
                  <td>{collection?.manage_no_year}</td>
                </tr>
                <tr>
                  <td>재료 및 기법</td>
                  <td>{collection?.matrl_technic}</td>
                </tr>
              </tbody>
            </InfoContainer>
          </InfoWrapper>
        </CollectionContent>
      )}
      {dialogOpen && (
        <Dialog open={dialogOpen} setOpen={setDialogOpen}>
          <DialogContent>
            <Title>즐겨찾기에 추가할까요?</Title>
            <ButtonContainer>
              <button className="cancel" onClick={() => handleBookmark(false)}>
                취소
              </button>
              <button className="confirm" onClick={() => handleBookmark(true)}>
                확인
              </button>
            </ButtonContainer>
          </DialogContent>
        </Dialog>
      )}
    </CollectionContainer>
  );
}

const CollectionContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const CollectionHeader = styled.header`
  position: relative;
  width: 100%;
  padding: 0 1rem;
`;

const CollectionContent = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 20rem;
  overflow: hidden;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1rem;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const InfoContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  td {
    padding: 0.5rem;
    font-size: 0.875rem;
    color: #686868;
    text-align: right;
  }
  td:first-child {
    width: 30%;
    color: #000000;
    text-align: left;
  }
`;

const DialogContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  padding: 1rem;
  background-color: #ffffff;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  width: 100%;
  button {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    &.cancel {
      background-color: #ffffff;
      color: #ff3d60;
      border: 1px solid #fff7f6;
      &:hover {
        background-color: #fff7f6;
      }
    }
    &.confirm {
      background-color: #999999;
      color: #ffffff;
      border: none;
      &:hover {
        background-color: #686868;
      }
    }
  }
`;
