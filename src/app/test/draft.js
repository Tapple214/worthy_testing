'use client'
import React, { useState } from 'react'
import '@/app/test/page.css'
import Switch from 'react-ios-switch'

import TinderCard from 'react-tinder-card'

export async function getProducts() {
    try {
      const response = await fetch('/api/products'); // Assuming your backend serves the API at /api/products
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const products = await response.json();
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }

function App () {

    const characters = [
        {
          "id": 1,
          "title": "Slide 1",
          "imageSrc": "https://via.placeholder.com/300"
        },
        {
          "id": 2,
          "title": "Slide 2",
          "imageSrc": "https://via.placeholder.com/300"
        },
        {
          "id": 3,
          "title": "Slide 3",
          "imageSrc": "https://via.placeholder.com/300"
        },
        {
          "id": 4,
          "title": "Slide 4",
          "imageSrc": "https://via.placeholder.com/300"
        },
        {
          "id": 5,
          "title": "Slide 5",
          "imageSrc": "https://via.placeholder.com/300"
        }
      ]

      const[lastDirection, setLastDirection] = useState();

      const swiped = (direction,nameToDelete) => { 
        console.log('deleting' , nameToDelete);
        setLastDirection(direction);
      }

      const OutOfFrame = (name) => {
        console.log('out of frame ' , name);
      }

  return (

    <div className='dashboard'>
        <div className='swiper-constainer'>
            <div className='card-container'>
                {characters.map((character) => (
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
              
                    console.log('you swiped ', lastDirection)
              
             : 
              
                    console.log('swipe a card or press a button to get Restore Card button visible!')
               
            }

        </div>
    </div>
  )
}

export default App