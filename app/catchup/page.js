import React from 'react'
import Image from 'next/image'
import { GoTriangleDown } from 'react-icons/go'

async function getCatchupShows(){
  const res = await fetch('http://localhost:3000/api/shows');

  return res.json();

}

async function CatchupPage() {
  const shows = await getCatchupShows();
  return (
    <div className='max-w-6xl mx-auto p-4'>
      {/* genres button */}
      <div className=' text-white flex items-center justify-start mt-24 space-x-4'>
        <div>
          
        </div>
        <div className='text-2xl font-bold cursor-pointer'>Catch Up</div>
        <div className='group relative flex items-center space-x-2 bg-slate-500 rounded-md pr-3'>
          <div className='text-xl font-bold bg-slate-400 rounded-md py-2 px-4'>
            <h3>Genres</h3>
          </div>
          <div>
            <GoTriangleDown size={20}/>
          </div>
          <div className='hidden group-hover:absolute group-hover:block top-10 -left-2  z-20 p-2 bg-slate-500 w-full rounded-b-md'>
            <ul className=''>
              <li className='cursor-pointer hover:bg-slate-600'>All Genres</li>
              <li className='cursor-pointer hover:bg-slate-600'>News</li>
              <li className='cursor-pointer hover:bg-slate-600'>Sport</li>
              <li className='cursor-pointer hover:bg-slate-600'>Education</li>
              <li className='cursor-pointer hover:bg-slate-600'>Drama</li>
              <li className='cursor-pointer hover:bg-slate-600'>Entertainment</li>
              <li className='cursor-pointer hover:bg-slate-600'>Religion</li>
              <li className='cursor-pointer hover:bg-slate-600'>Factual</li>
            </ul>
          </div>
        </div>
      </div>
      {/* shows */}
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-5 space-y-4'>
        {
          shows &&
          shows.data &&
          shows.data.map((show, index)=>{
            return(
              <div key={index} className='group hover:scale-110 hover:z-10 rounded-md overflow-hidden transtion duration-300 ease-in relative w-100 cursor-pointer'>
                <Image src={`https:${show.src}`} alt={show.title} width={250} height={250}/>
                <div className={`hidden group-hover:absolute group-hover:block z-20 w-full bottom-0 h-100 bg-gradient-to-t from-[#111111d8] from-80% to-transparent text-white p-4`}>
                  <h4 className='font-bold text-lg'>{show.title}</h4>
                  <p className='font-bold text-md'>{show.category}</p>
                  <div className='flex gap-2 items-center'>
                    {
                      show.pegi &&
                      <div className='px-1 text-white text-sm font-bold border-2 border-white border-solid'>
                        <span>{show.pegi}</span>
                      </div>

                    }
                    {
                      show.quality &&
                      <div className='px-1 text-white text-sm font-bold border-2 border-white border-solid'>
                        <span>{show.quality}</span>
                      </div>

                    }

                  </div>


                </div>
              </div>
            )
          })
        }

      </div>
    </div>
  )
}

export default CatchupPage