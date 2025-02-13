import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const newIssueSchema = z.object({
    title: z.string().min(3).max(255),
    description: z.string().min(5)
})

export async function POST(request: NextRequest) {
    const req = await request.json()

    const validation = newIssueSchema.safeParse(req)
    if(!validation.success)
        return NextResponse.json({error: validation.error.errors}, {status: 400})

    const result =await prisma.issue.create({
        data:{
            title: req.title,
            description: req.description
        }
    })
    return NextResponse.json(result, {status:201})
}
