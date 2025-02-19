import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(){
    const open = await prisma.issue.count({
        where:{
            status:"OPEN"
        }
    })

    const closed = await prisma.issue.count({
        where:{
            status:"CLOSED"
        }
    })

    const in_progress = await prisma.issue.count({
        where:{
            status:"IN_PROGRESS"
        }
    })

    return NextResponse.json({open, closed, in_progress}, {status:200})
}