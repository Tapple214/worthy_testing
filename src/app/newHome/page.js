import React from "react";
import prisma from "@/lib/prisma";
import Card from "@/app/components/card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  
  return (
    <Slider {...settings}>
      {products.map((product) => (
        <div key={product.id}>
          <Card
            key={product.id}
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
        </div>
      ))}
    </Slider>
  );
}