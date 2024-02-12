'use client'
import React, { useState, useEffect } from 'react';
import '@/app/test/page.css';
import Card from "@/app/components/card";
import TinderCard from 'react-tinder-card';


export default function App() {

  const [lastDirection, setLastDirection] = useState();


  const swiped = (direction, nameToDelete) => {
    console.log('deleting', nameToDelete);
    setLastDirection(direction);
  };

  const OutOfFrame = (name) => {
    console.log('out of frame ', name);
  };

  const [products, setProducts] = useState([])
  const [isLoading, setLoading] = useState(true)
  
  useEffect(() => {
    fetch('../api/test')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!products) return <p>No profile data</p>

  return (
    <div className='dashboard'>
      <div className='swiper-container'>

        <div className='card-container'>

          {
            products.map((product) => (
              <TinderCard 
              key={product.product_id} 
              className="swipe" 
              onSwipe={(direction) => swiped(direction,product.product_name)} 
              onCardLeft>
                
                <div style={{ backgroundImage: 'pp2.PNG' }} className='card'>
                  <h3>{product.product_name}</h3>
               </div>
              
              </TinderCard>
            ))
          }

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
