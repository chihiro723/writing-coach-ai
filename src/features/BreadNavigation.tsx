"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const BreadNavigation = () => {
  const pathname = usePathname();
  const pathnameArray = pathname.split("/");
  const currentPath = pathnameArray[pathnameArray.length - 1];
  return (
    <nav className="flex mt-8 mb-4 max-w-screen-lg mx-auto items-center space-x-4 text-gray-700">
      <Link
        href="/"
        className={`px-px text-blue-700 ${
          currentPath === "" && "border-b border-blue-700"
        }`}
      >
        ホーム
        <span className=""></span>
      </Link>

      <span>/</span>
      <div
        className={`px-px ${
          currentPath === "writing" && "border-b border-gray-700"
        }`}
      >
        回答
      </div>
      <span>/</span>
      <div
        className={`px-px ${
          currentPath === "correction" && "border-b border-gray-700"
        }`}
      >
        確認・添削
      </div>
    </nav>
  );
};

export default BreadNavigation;
