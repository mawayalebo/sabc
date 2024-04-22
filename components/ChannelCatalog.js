'use client'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { useState, useEffect } from 'react';
import {Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';



function ChannelCatalog() {
  const [channelCatalog, setChannelCatalog] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/channel-catalog');
        const data = await response.json();
        setChannelCatalog(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (typeof window !== 'undefined') { // Check if running on client-side
      fetchData();
    }
  }, []);

  return (
    <div>
      <div className='max-w-6xl mx-auto text-white '>

        {channelCatalog && (
          <div>
            {channelCatalog.data.map(((catalog, index) => (
              <div key={index} className='mb-5'>
                <h2 className='text-4xl font-semibold mb-4'>{catalog.title}</h2>
                <div>
                  {/* Client-side rendering with Swiper */}
                  <Swiper
                    modules={[Pagination]}
                    spaceBetween={0}
                    slidesPerView={5}
                    pagination={{ clickable: true }}
                  >
                    {catalog.list.map((channels, index) => (
                      <SwiperSlide key={index} className='rounded-md overflow-hidden flex justify-center items-center mr-10'>
                        <Image
                          src={`https:${channels.imgSource}`}
                          alt='channel image'
                          width={300}
                          height={300}
                          className='w-full cursor-pointer'
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            )))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChannelCatalog;
