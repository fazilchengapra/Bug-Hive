'use client'
import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const Navbar = () => {
    const pathName = usePathname()
    console.log(pathName)
  const link = [
    { label: "Issue", href: "/issue" },
    { label: "Dashboard", href: "/d" },
  ];
  return (
    <div>
      <nav className="flex space-x-6 px-16 border mb-5 h-16 items-center text-lg">
        <Link href={"/"}>
          <AiFillBug />
        </Link>
        <ul className="flex space-x-6">
          {link.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={classNames({
                'text-zinc-500': link.href !== pathName,
                'text-zinc-900': pathName.startsWith(link.href),
                'hover:text-zinc-800 transition-colors': true
              })}
            >
              {link.label}
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
