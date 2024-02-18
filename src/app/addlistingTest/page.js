'use client'

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useRef, useState, useEffect } from 'react';
import './addListingPage.css'
import Image from 'next/image';
import dropDownOpt from './mrt.json';

const containerStyle = {
    width: '100%',
    height: '200px',
    borderRadius: '15px',
};

const center = {
    lat: -34.397,
    lng: 150.644,
};

const values = ['$10', '$20', '$50', '$100', 'Others'];

export default function AddListingPage() {

    // product name

    const [productName, setproductName] = useState('');   

    const handleproductNameChange = (event) => {
        setproductName(event.target.value);
    } 

    // description box

    const [description, setDescription] = useState('');

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(description);
    
        try {
            const response = await fetch('/api/addListing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ description, productName })
            });
    
            if (!response.ok) {
                throw new Error('Failed to add listing');
            }
    
            console.log('Listing added successfully');
        } catch (error) {
            console.error(error);
        }
    
        setproductName('');
        setDescription('');
    };
    
    return (
        <>
            <Container>
                <form onSubmit={handleSubmit}>

                    <Row className='mt-4 mx-auto d-flex justify-content-center'>
                        <Col xs='12' lg='5'>
                        <h1>product Name</h1>
                        <p> Include keywords that people often search for when buying buying this product.</p>
                            <Row className='mx-auto'>                     
                            <input value={productName} onChange={handleproductNameChange} className='rounded '/>
                            </Row>
                        </Col>
                    </Row>

                    <Row className='mt-4 mx-auto d-flex justify-content-center'>
                        <Col xs='12' lg='5'>
                        <h1>Description</h1>
                        <p>What makes your product unique? Buyers will only see the first few lines unless they click to see more.</p>
                            <Row className='mx-auto'>                     
                                <textarea 
                                    id='description'
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    rows={4} 
                                    className='form-control border-secondary-subtle'
                                    maxLength={140}
                                />
                            </Row>
                        </Col>
                    </Row>

                    <Row className='pb-3 pt-4 px-2 mx-auto d-flex justify-content-center'>
                        <Col xs='12' lg='5'>
                            <button type='submit' id='btn' className='w-100 p-2 rounded'>Add New Listing</button>
                        </Col>
                    </Row>
                </form>
            </Container>
        </>
    )
}
