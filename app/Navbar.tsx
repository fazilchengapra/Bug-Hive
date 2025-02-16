"use client";
import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Box, Container, Flex } from "@radix-ui/themes";

const Navbar = () => {
  const pathName = usePathname();
  const { data: session, status } = useSession();
  const link = [
    { label: "Issue", href: "/issue/list" },
    { label: "Dashboard", href: "/d" },
  ];
  return (
    <div>
      <nav className="border  text-lg">
        <Container>
          <Flex className="h-16" justify={"between"}>
            <Box className="flex items-center space-x-5">
              <Link href={"/"}>
                <AiFillBug />
              </Link>
              {link.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={classNames({
                    "text-zinc-500": link.href !== pathName,
                    "text-zinc-900": pathName.startsWith(link.href),
                    "hover:text-zinc-800 transition-colors": true,
                  })}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
            <Box className="flex items-center">
              {status === "authenticated" && (
                <Link href={"/api/auth/signout"}>Log out</Link>
              )}
              {status === "unauthenticated" && (
                <Link href={"/api/auth/signin"}>Login</Link>
              )}
            </Box>
          </Flex>
        </Container>
      </nav>
    </div>
  );
};

export default Navbar;
