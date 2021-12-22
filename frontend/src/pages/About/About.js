import React,{useRef,useEffect, useState} from 'react'
import { Helmet } from 'react-helmet';
import {Image} from '@chakra-ui/react'
import HashLoader from "react-spinners/HashLoader";
import i1 from "../../components/img/i1.jpg"

import './aboutcss.css'
const About = () => {
    const Line = useRef(null);
    const text = useRef(null);
    useEffect(() => {
                setTimeout(() =>{
        Line.current.classList.add('lineon')
        text.current.classList.add('titleon');
        },5)


        return () => {

        }
    },[])
    return (
        

        
        <>
        <Helmet>
            <title>About</title>
        </Helmet>


            <div className='headingA'>
                <div className = 'line' ref={Line}>
                </div>
                <h1 className ='title' ref={text}>About Us</h1>
            </div>
            <div className='Content1'>
                <div className = 'text'>
                   
                <p> ShopiBuy is an ecommerce web application which has multple products under various categories.
                   The customers can search for a particular product belonging to a particular category.
                   When he/she clicks on a particular product, he/she can view the product details.. The customers can add a product to cart and place an order.They can make payment through PayPal.
                 The products and the categories will be managed by the Admin.

                </p>
                </div>
               
                   <div className ='imagecontainer'>
                    <div className = 'Imageabt'>
                    <Image className='mImage' boxSize = '400px' objectFit="cover" src={i1} alt="Segun Adebayo"/>
                    </div>
                   </div>
            </div>
            
        </>
    
    )
}

export default About
