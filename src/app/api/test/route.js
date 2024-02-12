import {NextResponse, nextResponse} from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {

    const products = await prisma.product.findMany({
        where: {
            posted: true
          },
          include: {
            user: {
              select: { user_name: true, assets: true, likes: true, supporters: true, pickup_location: true, rank: true, date_joined: true }
            }
          }
    })

    return NextResponse.json({products});

}
