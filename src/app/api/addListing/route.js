import {NextResponse, nextResponse} from "next/server"
import prisma from "@/lib/prisma";

export async function POST(request) {
    
        const requestData = await request.json();
        const { description, productName } = requestData;

        const products = await prisma.product.create({
            data: {
                user: {
                    create: {
                        user_name: 'apple',
                        rank: 'princess',
                        pickup_location: 'somerset',
                        likes: 10,
                        dislikes: 10,
                        supporters: 10,
                        assets: 10
                    }
                },
                product_name: productName,
                pickup_location: 'somerset',
                likes: 10,
                dislikes: 10,
                reports: 10,
                description: description,
                posted: true
            }
        });

        return NextResponse.json({products});
}

