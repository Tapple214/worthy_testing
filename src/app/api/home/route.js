import {NextResponse, nextResponse} from "next/server"
import prisma from "@/lib/prisma"

// GET API
// Connects to database via prisma
export async function GET() {

  // When a product post is posted (i.e. true), it will allow us to access its contents and user info
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

    // Return data as json file
    return NextResponse.json({products});
    
}

