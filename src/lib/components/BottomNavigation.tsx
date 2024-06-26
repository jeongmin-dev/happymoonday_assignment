"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { atom, useAtom } from "jotai";
import styled from "styled-components";
import { BookmarkIcon, HomeIcon } from "../styles/Icons";

export const bottomNavigationAtom = atom("/");

export default function BottomNavigation() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useAtom(bottomNavigationAtom);

  React.useEffect(() => {
    setActiveTab(pathname);
  }, [pathname]);

  return (
    <Nav>
      <NavItem href="/" active={(activeTab === "/").toString()}>
        <HomeIcon />
        <p>홈</p>
      </NavItem>
      <NavItem href="/bookmark" active={(activeTab === "/bookmark").toString()}>
        <BookmarkIcon />
        <p>즐겨찾기</p>
      </NavItem>
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem;
  max-width: 23.438rem;
  width: 100%;
  background-color: #000000;
`;

const NavItem = styled(Link)<{ active?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.125rem;
  padding: 0 1rem;
  color: ${({ active }) => (active === "true" ? "#ffffff" : "#686868")};
  text-decoration: none;
`;
