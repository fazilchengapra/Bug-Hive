import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const Navbar = () => {
  const link = [
    { label: "Issue", href: "/issue" },
    { label: "Dashboard", href: "/dashboard" },
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
              className="text-zinc-500 hover:text-zinc-800 transition-colors"
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
