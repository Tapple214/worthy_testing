// // Assuming you have already initialized PrismaClient
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// // Define your API endpoint
// app.get('/api/products', async (req, res) => {
//   try {
//     const products = await prisma.product.findMany({
//       where: {
//         posted: true
//       },
//       include: {
//         user: {
//           select: { user_name: true, assets: true, likes: true, supporters: true, pickup_location: true, rank: true, date_joined: true }
//         }
//       }
//     });
//     res.json(products);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

import { NextResponse } from 'next/server';

export async function GET(request) {
    const res = await request.json();
    console.log({res});
    return NextResponse.json({data:res});
}
