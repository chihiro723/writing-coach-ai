"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const BreadNavigation = () => {
  const pathname = usePathname();
  const pathnameArray = pathname.split("/");
  const currentPath = pathnameArray[pathnameArray.length - 1];
  return (
    <nav className="bg-gray-50 border-b border-gray-100">
      <div className="flex items-center py-3 px-6 max-w-6xl mx-auto space-x-3 text-sm">
        <Link
          href="/"
          className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
            currentPath === ""
              ? "bg-orange-100 text-orange-700 font-medium"
              : "text-gray-600 hover:text-orange-600"
          }`}
        >
          ホーム
        </Link>
        <span className="text-gray-400">→</span>
        <div
          className={`px-3 py-2 rounded-lg ${
            currentPath === "writing"
              ? "bg-orange-100 text-orange-700 font-medium"
              : "text-gray-500"
          }`}
        >
          回答
        </div>
        <span className="text-gray-400">→</span>
        <div
          className={`px-3 py-2 rounded-lg ${
            currentPath === "correction"
              ? "bg-orange-100 text-orange-700 font-medium"
              : "text-gray-500"
          }`}
        >
          確認・添削
        </div>
      </div>
    </nav>
  );
};

export default BreadNavigation;
