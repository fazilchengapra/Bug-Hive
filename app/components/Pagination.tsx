import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const totalPage = Math.ceil(itemCount / pageSize);

  if (totalPage <= 1) return null;
  return (
    <Flex align={"center"} gap={"2"}>
      <Text size={'2'}>
        page {currentPage} of {totalPage}
      </Text>
      <Button className="cursor-pointer" color="gray" variant="soft" disabled={currentPage === 1}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button className="cursor-pointer" color="gray" variant="soft" disabled={currentPage === 1}>
        <ChevronLeftIcon />
      </Button>

      <Button className="cursor-pointer" color="gray" variant="soft" disabled={currentPage === totalPage}>
        <ChevronRightIcon />
      </Button>

      <Button className="cursor-pointer" color="gray" variant="soft" disabled={currentPage === totalPage}>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
