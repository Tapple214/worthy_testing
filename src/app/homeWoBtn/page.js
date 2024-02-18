'use client'

// Main page where all happens

// React imports
import React, { useState, useEffect } from 'react';
import Card from "@/app/components/card/card";
import TinderCard from 'react-tinder-card';

// module/"library" imports; taken from the react tinder swipe repo
// import Switch from 'react-ios-switch'
// import Advanced from '@/app/components/swipeButtons/Advanced'
// import Simple from '@/app/components/swipeButtons/Simple'

// CSS imports
import 'bootstrap/dist/css/bootstrap.css';
import '@/app/upHome/page.css';

export default function HomePage() {

  // Showing the buttons for sliding directions
  const [showAdvanced, setShowAdvanced] = useState(true)

  // Set/Init empty array to store products
  const [products, setProducts] = useState([]);

  // To show direction
  const [lastDirection, setLastDirection] = useState();

  // Fetch products using API from database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/upHome', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products); 
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []); 

  // Display/Checking purposes
  const swiped = (direction, nameToDelete) => {
    console.log('deleting', nameToDelete);
    setLastDirection(direction);
  };

  const OutOfFrame = (name) => {
    console.log('out of frame ', name);
  };

  return (
    <>
      <div className="py-5">
        <div className='tinder-card-container'>
          {products.map((product) => (
            // Imported component
            <TinderCard
              key={product.product_id}
              className='swipe'
              onSwipe={(direction) => swiped(direction, product.product_name)}
              onCardLeftScreen={() => OutOfFrame(product.product_name)}
            >
              {/* Created component */}
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
            </TinderCard>
          ))}
        </div>
      </div>

      {/* Display/Checking purposes */}
      <div className='swipe-info'>
        {lastDirection ?
          console.log('You swiped', lastDirection)
          :
          console.log('Swipe a card or press a button to get Restore Card button visible!')
        }
      </div>
    </>
  );
}
