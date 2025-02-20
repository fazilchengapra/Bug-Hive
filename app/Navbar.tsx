"use client";
import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Avatar, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";
import { SunIcon } from "@radix-ui/react-icons";
import { MoonIcon } from '@heroicons/react/24/solid'


const Navbar = ({toggleTheme, theme}:{toggleTheme: () => void, theme:'light'|'dark'}) => {
  return (
    <div>
      <nav className="border-b text-lg">
        <Container>
          <Flex className="h-16 items-center" justify={"between"}>
            <NavLinks theme={theme}/>
            <UserAction toggleTheme={toggleTheme} theme={theme}/>
          </Flex>
        </Container>
      </nav>
    </div>
  );
};

const UserAction = ({toggleTheme, theme}:{toggleTheme: () => void, theme:'light'|'dark'}) => {
  const { data: session, status } = useSession();


  if (status === "loading") return <Skeleton width={"3rem"} />;
  if (status === "unauthenticated")
    return (
      <Link className=" nav-link" href={"/api/auth/signin"}>
        Login
      </Link>
    );

  return (
    <Flex className="items-center" gap={"5"}>
      {theme === 'light' ? <SunIcon height={20} width={20} onClick={() => toggleTheme()} /> : <MoonIcon height={20} width={20} onClick={() => toggleTheme()}/>}
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
    </Flex>
  );
};

const NavLinks = ({theme}:{theme:'light'|'dark'}) => {
  const pathName = usePathname();
  const link = [
    { label: "Issue", href: "/issue/list" },
    { label: "Dashboard", href: "/d" },
  ];

  return (
    <Flex className="!items-center" gap={"5"}>
      <Link href={"/"}>
        <AiFillBug />
      </Link>

      {link.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={classNames({
            "nav-link": theme === 'light',
            "nav-link-dark": theme === 'dark',
            "!text-zinc-900": pathName.startsWith(link.href) && theme === 'light',
            "!text-zinc-300": pathName.startsWith(link.href) && theme === 'dark',
          })}
        >
          {link.label}
        </Link>
      ))}
    </Flex>
  );
};

export default Navbar;
