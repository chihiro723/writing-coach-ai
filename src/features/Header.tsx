import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-500">
      <div className="flex items-center p-5 text-white max-w-screen-lg mx-auto">
        <Link href="/">
          <div className="text-xl font-bold flex hover:text-gray-200">
            <Image
              src="/logo_white.png"
              alt=""
              className="w-8 h-auto"
              width={30}
              height={30}
            />
            <span className="ml-3 text-2xl font-serif font-bold">
              英作文道場
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
