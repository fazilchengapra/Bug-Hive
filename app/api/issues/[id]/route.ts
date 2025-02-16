import { issueValidationSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session =await getServerSession()
  if(!session) return NextResponse.json({error: "Unauthorized request"}, {status:401})
  const body = await request.json();

  const validateData = issueValidationSchema.safeParse(body);
  if (!validateData.success)
    return NextResponse.json(validateData.error?.errors, { status: 400 });

  const issueData = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!issueData)
    return NextResponse.json({ error: "Unexpected error" }, { status: 400 });

  const result = await prisma.issue.update({
    where: {
      id: parseInt(params.id),
    },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(result, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session =await getServerSession()
  if(!session) return NextResponse.json({error: "Unauthorized request"}, {status:401})
  const { id } = params;
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid Request" }, { status: 404 });
  await prisma.issue.delete({
    where: {
      id: issue.id,
    },
  });
  return NextResponse.json({});
}
