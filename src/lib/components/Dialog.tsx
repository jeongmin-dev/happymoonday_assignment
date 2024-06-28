"use client";

import React from "react";
import styled from "styled-components";

interface DialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
}

export default function Dialog({ open, setOpen, children }: DialogProps) {
  return (
    <DialogWrapper onClick={() => setOpen(false)}>
      <DialogContainer>{children}</DialogContainer>
    </DialogWrapper>
  );
}

const DialogWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
`;

const DialogContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20rem;
  min-height: 10rem;
  background-color: #ffffff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 2.5rem;
`;
