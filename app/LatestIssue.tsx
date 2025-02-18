import { prisma } from "@/prisma/client";
import { Avatar, Box, Card, Flex, Heading, Table, Text } from "@radix-ui/themes";
import { IssueStatusBadge } from "./components";
import Link from "next/link";

const LatestIssue = async () => {
  const latestIssues = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
      assignedUsers: true,
    },
  });
  return (
    <>
      <Card>
        <Heading size={'4'} mb="5">Latest Issues</Heading>
        <Table.Root>
          <Table.Body>
            {latestIssues.map((e) => (
              <Table.Row key={e.id}>
                <Table.Cell>
                  <Flex justify={"between"} align={"start"}>
                    <Flex direction={"column"} gap={"4"}>
                      <Link href={"/issue/" + e.id}>
                        <Text>{e.title}</Text>
                      </Link>
                      <div className="w-fit">
                        <IssueStatusBadge status={e.status} />
                      </div>
                    </Flex>
                    {e.assignedUsers && (
                      <Box>
                        <Avatar
                          fallback="?"
                          src={e.assignedUsers.image!}
                          size={"2"}
                          radius="full"
                        />
                      </Box>
                    )}
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Card>
    </>
  );
};

export default LatestIssue;
