"use client";

import React from "react";
import Image from "next/image";
import styled from "styled-components";
import Title from "./atoms/Title";
import { Item } from "../services/apis/search.types";

interface ItemCardProps {
  item: Item;
  onClick?: () => void;
}

const ItemCard = React.forwardRef<HTMLDivElement, ItemCardProps>(
  ({ item, onClick }, ref) => {
    return (
      <ItemCardContainer ref={ref} onClick={onClick}>
        <ImageContainer>
          <div />
          <Image
            src={item.thumb_image}
            alt={item.prdct_nm_korean}
            fill
            sizes="100%"
            priority
            quality={50}
          />
        </ImageContainer>
        <InfoContainer>
          <Title lineClamp={2}>{item.prdct_nm_korean}</Title>
          <p>{`${item.writr_nm} (${item.mnfct_year})`}</p>
          <p>{item.prdct_cl_nm}</p>
        </InfoContainer>
      </ItemCardContainer>
    );
  }
);

export default ItemCard;

const ItemCardContainer = styled.div`
  border-radius: 0.5rem;
  cursor: pointer;
  &:hover > * {
    color: #686868;
    img {
      transform: scale(1.05);
      transition: transform 0.3s;
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 10rem;
  overflow: hidden;
  border-radius: 0.5rem;
  div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 1;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;

  p {
    font-size: 0.875rem;
    color: #808080;
  }
`;
