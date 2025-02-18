"use client";
import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const Navbar = () => {
  return (
    <div>
      <nav className="border text-lg">
        <Container>
          <Flex className="h-16 items-center" justify={"between"}>
            <NavLinks />
            <UserAction />
          </Flex>
        </Container>
      </nav>
    </div>
  );
};

const UserAction = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <Skeleton width={"3rem"} />;
  if (status === "unauthenticated")
    return (
      <Link className=" nav-link" href={"/api/auth/signin"}>
        Login
      </Link>
    );

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          referrerPolicy="no-referrer"
          className="cursor-pointer"
          src={session!.user!.image!}
          fallback="?"
          size="2"
          radius="full"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <Text>
          <DropdownMenu.Label>{session!.user?.email}</DropdownMenu.Label>
        </Text>
        <Link href={"/api/auth/signout"}>
          <DropdownMenu.Item color="red">Log out </DropdownMenu.Item>
        </Link>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

const NavLinks = () => {
  const pathName = usePathname();
  const link = [
    { label: "Issue", href: "/issue/list" },
    { label: "Dashboard", href: "/d" },
  ];

  return (
    <Flex className="!items-center" gap={"5"}>
      <Link  href={"/"}>
        <AiFillBug />
      </Link>

      {link.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={classNames({
            "nav-link": true,
            "!text-zinc-900": pathName.startsWith(link.href),
          })}
        >
          {link.label}
        </Link>
      ))}
    </Flex>
  );
};

export default Navbar;
