'use client'

import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

function Banner() {
  return (
    <div>
        <Carousel>
            <Image src={'/images/banner1.avif'} alt='banner image' width={100} height={100}/>    
            <Image src={'/images/banner2.avif'} alt='banner image' width={100} height={100}/>   
        </Carousel>
    </div>
  )
}

export default Banner