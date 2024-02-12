import prisma from "@/lib/prisma";
import Product from "@/app/components/product";
import Card from "@/app/components/card";

async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      where: {
        posted: true
      },
      include: {
        user: {
          select: { user_name: true, assets: true, likes: true, supporters: true, pickup_location: true, rank: true, date_joined: true }
        }
      }
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}


export default async function Home() {

  const products = await getProducts();
  console.log({products});
  
  return (
    <>
              {products.map((product) => (
                  <Card
                  key={product.id}
                  id={product.id}
                  userName={product.user.user_name}
                  pickupLocation={product.user.pickup_location}
                  rank={product.user.rank}
                  userLikes={product.user.likes}
                  userSupporters={product.user.supporters}
                  userAssets={product.user.assets}
                  dateJoined={product.user.date_joined}
                  productName={product.product_name}
                  productDescription={product.description}
                  />
                  ))}
      
    </>
  )
}
