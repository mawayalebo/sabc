'use client'

import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

function Banner() {
  return (
    <div className='relative'> 
        <Carousel autoPlay={true} interval={10000} showThumbs={false} >
            <Image src={'/images/banner1.avif'} alt='banner image' width={100} height={100}/>    
            <Image src={'/images/banner2.avif'} alt='banner image' width={100} height={100}/>   
        </Carousel>
        <div className='absolute top-0 w-full h-full bg-gradient-to-b from-[#111111] from-5% via-transparent to-[#222127] to-85%'>

        </div>
    </div>
  )
}

export default Banner