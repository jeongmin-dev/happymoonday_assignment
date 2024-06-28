import React from "react";
import Component from "@/lib/components/Component";
import BackToTop from "@/lib/components/BackToTop";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Component>
      {children}
      <BackToTop />
    </Component>
  );
}
