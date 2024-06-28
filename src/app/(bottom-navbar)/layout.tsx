import React from "react";
import Component from "@/lib/components/Component";
import BottomNavigation from "@/lib/components/BottomNavigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Component>
      {children}
      <BottomNavigation />
    </Component>
  );
}
