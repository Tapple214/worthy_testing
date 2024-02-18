'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import Card from "@/app/components/card/card";
import TinderCard from 'react-tinder-card';
import '@/app/homeWBtn/App.css'

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [lastDirection, setLastDirection] = useState();
  const currentIndexRef = useRef(0);
  const childRefs = useRef([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/home', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products); 
          childRefs.current = data.products.map(() => React.createRef()); // Create refs for each product
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []); 

  useEffect(() => {
    currentIndexRef.current = products.length - 1;
  }, [products]);

  const canGoBack = currentIndexRef.current < products.length - 1;
  const canSwipe = currentIndexRef.current >= 0;

  const swiped = (direction, nameToDelete, index) => {
    console.log('deleting', nameToDelete);
    setLastDirection(direction);
    currentIndexRef.current = index - 1;
  };

  const outOfFrame = (name, index) => {
    console.log('out of frame ', name);
    currentIndexRef.current >= index && childRefs.current[index]?.current?.restoreCard(); // Added optional chaining here
  };

  const swipe = async (dir, index) => {
    if (canSwipe && index >= 0 && index < products.length && childRefs.current[index]?.current) { // Added optional chaining here
      await childRefs.current[index].current.swipe(dir);
    }
  };
  
  const goBack = async () => {
    if (canGoBack && childRefs.current[currentIndexRef.current + 1]?.current) { // Added optional chaining here
      const newIndex = currentIndexRef.current + 1;
      currentIndexRef.current = newIndex;
      await childRefs.current[newIndex].current.restoreCard();
    }
  };

  return (
    <>
      <Container className="py-5 d-flex flex-column">
        <Row className='tinder-card-container'>
      
          {products.map((product, index) => (
            <TinderCard
              key={product.product_id}
              ref={childRefs.current[index]}
              className='swipe'
              onSwipe={(direction) => swiped(direction, product.product_name, index)}
              onCardLeftScreen={() => outOfFrame(product.product_name, index)}
            >
              <Card
                className='z-0'
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

        </Row>
      </Container>

      <Row className='swipe-info'>
        {lastDirection ?
          console.log('You swiped', lastDirection)
          :
          console.log('Swipe a card or press a button to get Restore Card button visible!')
        }
      </Row>

      <Container className="py-3 buttons mx-auto w-auto h-auto">
        <Row className='buttons d-flex justify-content-center mx-auto'>
          <button id='leftBtn' style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left', currentIndexRef.current)}>Swipe left!</button>
          <button id='undoBtn' style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={goBack}>Undo swipe!</button>
          <button id='rightBtn' style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right', currentIndexRef.current)}>Swipe right!</button>
          <button id='upBtn' style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('up', currentIndexRef.current)}>Swipe up!</button>
          <button id='downBtn' style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('down', currentIndexRef.current)}>Swipe down!</button>
        </Row>
      </Container>

    </>
  );
}
