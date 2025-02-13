import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { newIssueSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
    const req = await request.json()

    const validation = newIssueSchema.safeParse(req)
    if(!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400})

    const result =await prisma.issue.create({
        data:{
            title: req.title,
            description: req.description
        }
    })
    return NextResponse.json(result, {status:201})
}
