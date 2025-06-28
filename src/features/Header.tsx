import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="flex items-center py-4 px-6 max-w-6xl mx-auto">
        <Link href="/">
          <div className="flex items-center hover:opacity-80 transition-opacity duration-200">
            <Image
              src="/logo_orange.png"
              alt="英作文道場ロゴ"
              className="w-10 h-10"
              width={40}
              height={40}
            />
            <span className="ml-3 text-2xl font-bold text-gray-800">
              英作文道場
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
