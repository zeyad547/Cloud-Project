"use client";

import Link from "next/link";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";

const NavBar = () => {
  // Correct usage of useUser hook inside the component
  const { isSignedIn, user } = useUser();
  const currentPage = window.location.pathname;

  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent">
        <Link href="/" className="flex justify-center items-center">
          <Image src="/logo.svg" alt="logo" width={118} height={18} className="object-contain" />
        </Link>
        {isSignedIn && currentPage !== "/fandom" && (
          <Link href="/fandom" className="flex justify-center items-center">
            <h1 className="hero__subtitle">Check Fandom</h1>
          </Link>
        )}
        {currentPage !== "/map" && (
          <Link href="/map" className="flex justify-center items-center">
            <h1 className="hero__subtitle">Locate mechanic</h1>
          </Link>
        )}

        <UserButton afterSignOutUrl="/" />
      </nav>
    </header>
  );
};

export default NavBar;
