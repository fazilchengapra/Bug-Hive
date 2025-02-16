"use client";
import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";

const Navbar = () => {
  const pathName = usePathname();
  const { data: session, status } = useSession();
  const link = [
    { label: "Issue", href: "/issue/list" },
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
            <li key={link.href}>
              <Link
                href={link.href}
                className={classNames({
                  "text-zinc-500": link.href !== pathName,
                  "text-zinc-900": pathName.startsWith(link.href),
                  "hover:text-zinc-800 transition-colors": true,
                })}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Box>
              {status === 'authenticated' && <Link href={'/api/auth/signout'}>Log out</Link>}
              {status === 'unauthenticated' && <Link href={'/api/auth/signin'}>Login</Link>}
            </Box>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
