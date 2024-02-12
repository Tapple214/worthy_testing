'use client'
import React, { useState, useEffect } from 'react';
import '@/app/test/page.css';
import Card from "@/app/components/card";
import TinderCard from 'react-tinder-card';
import prisma from "@/lib/prisma";

// async function getProducts() {
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
//     return products;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return [];
//   }
// }

export default function App() {
  const [products, setProducts] = useState([]);
  const [lastDirection, setLastDirection] = useState();

  const [title, setTitle] = useState('');

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const fetchedProducts = await getProducts();
  //     setProducts(fetchedProducts);
  //   };

  //   fetchProducts();
  // }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  const swiped = (direction, nameToDelete) => {
    console.log('deleting', nameToDelete);
    setLastDirection(direction);
  };

  const OutOfFrame = (name) => {
    console.log('out of frame ', name);
  };

  try{
    fetch('/api/test', {
      method: 'GET', 
      headers: {
      'Content-Type': 'application/json'    
    }
    // body: JSON.stringify({title})
    })
  } catch(error){
  console.error(error)
  }

  return (
    <div className='dashboard'>
      <div className='swiper-container'>
        <div className='card-container'>
          {products.map((product) => (
            <TinderCard className='swipe' key={character.id} onSwipe={(direction) => swiped(direction,character.title)} onCardLeft>
              <div style={{ backgroundImage: `url(${character.imageSrc})` }} className='card'>
                  <h3>{character.title}</h3>
              </div>
          </TinderCard>
          ))}
        </div>
      </div>

      <div className='swipe-info'>
        {lastDirection ?
          console.log('You swiped', lastDirection)
          :
          console.log('Swipe a card or press a button to get Restore Card button visible!')
        }
      </div>
    </div>
  );
}
