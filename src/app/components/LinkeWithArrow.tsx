"use client";

import Link from "next/link";
import React from "react";
import "../css/LinkButton.css"

interface LinkWithArrowProps {
  href: string;
  children: React.ReactNode;
}

const LinkWithArrow: React.FC<LinkWithArrowProps> = ({ href, children }) => {
  return (
    <Link href={href} passHref className="link-with-arrow">
      <p>{children}</p>
      <svg
        className="arrow"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 5L16 12L8 19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
};

export default LinkWithArrow;
