'use client'

import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper';
import 'swiper/css';


async function getChannelCatalogue() {
    const res = await fetch('http://localhost:3000/api/channel-catalog', {cache:"no-cache"});
    return res.json();
}


export default async function ChannelCatalog() {
    const [ channelCatalog, setChannelCatalog] = useState();

    useEffect(() => {
        async function getChannelCatalogue() {
            const res = await fetch('http://localhost:3000/api/channel-catalog', {cache:"no-cache"});
            setChannelCatalog(res.json());
        }
    }, [])
    
    
    
  return (
    <div>
        <div className='max-w-6xl mx-auto text-white'>
            <div>
                {
                    channelCatalog &&
                    channelCatalog.map(((group, index)=>{
                        return(
                            <div key={index}>
                                <h2 className='text-4xl font-bold'>{group.title}</h2>
                                <Swiper
                                    spaceBetween={50}
                                    slidesPerView={3}
                                >
                                {
                                    group.list &&
                                    group.list.map((item, index)=>{
                                        return(
                                            <SwiperSlide key={index} className='' >
                                                <Image className='cursor-pointer' src={`https:${item.imgSource}`} alt="channel logo" width={250} height={200} loading='lazy' />
                                            </SwiperSlide>
                                        )
                                    })
                                }

                                </Swiper>
                            </div>
                        )
                    }))
                }
            </div>

        </div>

    </div>
  )
}

