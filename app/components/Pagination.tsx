"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const totalPage = Math.ceil(itemCount / pageSize);
  const router = useRouter();
  const searchParams = useSearchParams();

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  if (totalPage <= 1) return null;
  return (
    <Flex align={"center"} gap={"2"} mt={'4'}>
      <Text size={"2"}>
        page {currentPage} of {totalPage}
      </Text>
      <Button
        className="cursor-pointer"
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        className="cursor-pointer"
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        className="cursor-pointer"
        color="gray"
        variant="soft"
        disabled={currentPage === totalPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>

      <Button
        className="cursor-pointer"
        color="gray"
        variant="soft"
        disabled={currentPage === totalPage}
        onClick={() => onPageChange(totalPage)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
