"use client";

import React from "react";
import styled from "styled-components";
import Dialog from "../Dialog";
import Title from "../atoms/Title";

interface SearchDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function SearchDialog({ open, setOpen }: SearchDialogProps) {
  return (
    <Dialog open={open} setOpen={setOpen}>
      <DialogContent>
        <Title>검색어를 입력해주세요.</Title>
        <ButtonContainer>
          <button className="confirm" onClick={() => setOpen(false)}>
            확인
          </button>
        </ButtonContainer>
      </DialogContent>
    </Dialog>
  );
}

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
