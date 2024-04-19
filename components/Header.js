'use client'

import Image from 'next/image'
import { useState, useRef, useEffect} from 'react';
import Link from 'next/link';

function Header() {

    const [activeItem, setActiveItem] = useState('Home');

    const handleClick = (item) => {
      setActiveItem(item);
    };

    const [isScrolled, setIsScrolled] = useState(false);
    const navbarRef = useRef(null);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0); // Scrolled when scrollY is greater than 0
    };

    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
  
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  


  return (
    <div 
      ref={navbarRef} 
      className={
        `fixed top-0 left-0 z-10 w-full transition  will-change-transform duration-1000 delay-150 ease-in-out 
        ${
          isScrolled ? 'bg-[#111111d8]' : 'py-4 bg-gradient-to-t from-[#222127] to-transparent/70'
        }`
      }
    >
        <div className='mx-auto max-w-6xl p-5 flex items-center justify-start'>
            <Link href={'/'} onClick={() => handleClick('Home')}>
              <Image src={'/images/logo.png'} alt='logo' width={100} height={100}/>
            </Link>
            <nav className='flex items-center justify-between text-white px-4'>
              <ul className="flex space-x-4 font-medium text-sm">
                <Link
                  className={`px-3 cursor-pointer hover:text-yellow-500 ${activeItem === 'Home' ? 'border-b-[2px] border-b-yellow-600' : ''}`}
                  onClick={() => handleClick('Home')}
                  href={'/'}
                >
                  Home
                </Link>
                <Link
                  className={`px-3 cursor-pointer hover:text-yellow-500 ${activeItem === 'TV' ? 'border-b-[2px] border-b-yellow-600' : ''}`}
                  onClick={() => handleClick('TV')}
                  href={'/tv'}
                >
                  TV
                </Link>
                <Link
                  className={`px-3 cursor-pointer hover:text-yellow-500 ${activeItem === 'Radio' ? 'border-b-[2px] border-b-yellow-600' : ''}`}
                  onClick={() => handleClick('Radio')}
                  href={'/radio'}
                >
                  Radio
                </Link>
                <Link
                  className={`px-3 cursor-pointer hover:text-yellow-500 ${activeItem === 'Catchup Games' ? 'border-b-[2px] border-b-yellow-600' : ''}`}
                  onClick={() => handleClick('Catchup Games')}
                  href={'/catchup'}
                >
                  Catchup Games
                </Link>
                <Link
                  className={`px-3 cursor-pointer hover:text-yellow-500 ${activeItem === 'Manage Your TV License' ? 'border-b-[2px] border-b-yellow-600'  : ''}`}
                  onClick={() => handleClick('Manage Your TV License')}
                  href={'/tv-license'}
                >
                  Manage Your TV License
                </Link>
              </ul>
            </nav>
        </div>
    </div>
  )
}

export default Header