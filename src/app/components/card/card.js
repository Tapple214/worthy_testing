'use client'

// Card component

// React imports
import React from 'react'; 
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// Image enabler
import Image from 'next/image';

// CSS imports
import 'bootstrap/dist/css/bootstrap.css';
import '@/app/components/card/card.css';

// Image imports
import pic from '@/app/components/card/pp.PNG'
import pic2 from '@/app/components/card/slippers.jpg'

export default function Card({id, userName, pickupLocation, rank, userLikes, userSupporters, userAssets, dateJoined, productName, productDescription }) {
    
    // Capitlizing the first letter
    userName = userName.charAt(0).toUpperCase() + userName.slice(1);
    pickupLocation = pickupLocation.charAt(0).toUpperCase() + pickupLocation.slice(1);
    productName = productName.charAt(0).toUpperCase() + productName.slice(1);
    productDescription = productDescription.charAt(0).toUpperCase() + productDescription.slice(1);

    const [show, setShow] = useState(false);
    const [showDescription, setShowDescription] = useState(false);

    const toggleArrow = () => {
        setShow(!show);
        setShowDescription(!showDescription);
    };

    function toggleParagraph() {
        var paragraph = document.querySelector('.limited-text');
        paragraph.style.webkitLineClamp = paragraph.style.webkitLineClamp === '2' ? 'unset' : '2';
    }

    const imageOverlayStyle = {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '70%',
        background: 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7), rgba(0, 0, 0))',
    };
    
    const cardContentStyle = {
        position: 'absolute',
        bottom: '40px',
        color: 'white',
        marginBottom: '60px',
        transform: show ? 'translateY(50px)' : 'translateY(0)',
    };

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Container>
            <Row className='d-flex justify-content-center mx-auto w-auto h-auto'> 
                <Col xs='11' lg='6'> 

                    {/* Card entity */}
                    <div className='card' key={index}>

                    {/* pic 2 will be a placeholder for the time being */}
                    <Image src={pic2} alt='Image of product' className={`card ${show ? 'dim' : ''}`} layout='fill' objectFit='cover' />

                    <div style={imageOverlayStyle}></div>

                    {/* Card content */}
                    <Row className='mx-auto d-flex flex-column justify-content-center w-auto' style={{...cardContentStyle}}>
                        
                        {/* Title + toggle button */}
                        <Col className='d-flex align-items-center w-auto' xs='12' lg='11'>
                            <div className='w-100'>
                                <h2 style={{transition: 'opacity 0.5s'}}>{productName}</h2>
                            </div>
                    
                            <Col className='d-flex'>
                                {!show ? (
                                    // up arrow
                                    <svg onClick={toggleArrow} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"/>
                                    </svg>
                                ) : (
                                    // down arrow
                                    <svg onClick={toggleArrow} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"/>
                                    </svg> 
                                )}
                            </Col>
                        </Col>

                        {/*  location info  */}
                        <Col className='d-flex'>
                            <Col>
                                <h5 className='d-flex align-items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                    </svg>
                                    &nbsp; {pickupLocation}
                                </h5>
                            </Col>
                        </Col>
                        
                        {/* Horizontal line */}
                        <Row>
                            <Col>
                                <hr style={{ borderTop: '1px solid white', width: '15%' }} />
                            </Col>
                        </Row>

                        {/* Product details + user details */}
                        <div className={`descriptionBox ${showDescription ? 'visible' : ''} w-auto mx-auto`}>
                            
                            {/* Product description */}
                            <Col xs='12' lg='11' className='pb-2 w-auto'>
                                <p className='limited-text'>{productDescription}</p>
                                
                                <div style={{ marginTop: '-5px' }}>
                                    <span className='view-more' onClick={toggleParagraph}>
                                        <h5 className='fw-bold'>View More</h5>
                                    </span>
                                </div>
                            </Col>
                        
                            {/* User details */}
                            <Row xs='12' lg='12' className='d-flex flex-row w-auto justify-content-center mx-auto pt-2 w-auto'>
                                
                                {/* User details + rank */}
                                <Col className='d-flex'>
                                    <div className='ps-3'> 
                                        <div className='profilePic mt-1 ms-2'>
                                            <Image src={pic} alt='Profile picture' width={1000} height={1000} className='rounded-circle' />
                                        </div>
                                    </div>

                                    <Col className='ps-4'>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <h1 className='fw-bold'>{userName}</h1>
                                            <h5 style={{ marginLeft: '10px' }}>{rank}</h5>
                                        </div>

                                        <h5>Joined on  {dateJoined ? new Date(dateJoined).toLocaleString() : null}</h5>

                                        <div className='d-flex text-center'>
                                            <ul style={{ margin: '0', marginLeft: '-9px', marginRight: '2px', padding: '0', display: 'flex', justifyContent: 'space-around', width: '100%', alignItems: 'center' }}>
                                                <li style={{ width: '20%' }}>
                                                    <p><span className='fw-bold' style={{ fontSize: '14px' }}>{userLikes}</span>&nbsp; Likes</p>
                                                </li>

                                                <li style={{ width: '5%', textAlign: 'center', height: '30px' }}>
                                                    <h3>·</h3>
                                                </li>

                                                <li style={{ width: '25%' }}>
                                                    <p><span className='fw-bold' style={{ fontSize: '14px' }}>{userSupporters}</span>&nbsp; Supporters</p>
                                                </li>

                                                <li style={{ width: '5%', textAlign: 'center', height: '30px' }}>
                                                    <h3>·</h3>
                                                </li>

                                                <li style={{ width: '20%' }}>
                                                    <p><span className='fw-bold' style={{ fontSize: '14px' }}>{userAssets}</span>&nbsp; Assets</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </Col>  
                                </Col>

                                {/* Pickup location + report buttons */}
                                <Row className='d-flex w-100 ps-3'>
                                    <Col className='d-flex flex-column mx-auto w-100 h-25 pt-2'>
                                        <h1 className='text-center fw-medium pt-1'>
                                            <span className='fw-bold' style={{fontSize: '13px'}}>
                                            Pickup Location
                                            </span>
                                        </h1>

                                        <div className='d-flex flex-col h-auto align-items-center justify-content-center border rounded mx-auto w-100' style={{paddingTop: '15px', height:'35px'}}>
                                            <p style={{lineHeight: '2px'}}>{pickupLocation}</p>
                                            
                                            <p style={{lineHeight: '1px'}}>&nbsp; MRT Station</p>
                                        </div>
                                    </Col>

                                    <Col className='pb-3 d-flex justify-content-center mx-auto pt-3 w-100'>
                                        <Col xs='12' lg='12' className='d-flex flex-column'>
                                            <button id='btn' className='w-100 h-50 rounded pt-2'>
                                                <h3>Report user</h3>
                                            </button>

                                            <button id='btn' className='w-100 h-50 rounded mt-2 pt-2'>
                                                <h3>Report item</h3>
                                            </button>
                                        </Col>
                                    </Col>
                                </Row>  
                            </Row>
                        </div>
                    </Row>  
                    </div>

                </Col>
            </Row>
        </Container>
    )
}