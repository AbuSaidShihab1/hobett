import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Pagination,Autoplay} from 'swiper/modules';
import { GoStarFill } from "react-icons/go";
import { NavLink } from 'react-router-dom';
import { IoGameController } from "react-icons/io5";
import { SiLegacygames } from "react-icons/si";
import { FaPlay } from "react-icons/fa";

const Gameshows = () => {
    const swiperRef = useRef(null);
    
    const [categoires,set_categories]=useState([
        {
            id:1,
            image:"https://elon.casino/image/vertical_2/7451.webp",
        },
        {
            id:2,
            image:"https://elon.casino/image/vertical_2/14141.webp",
        },
        {
            id:3,
            image:"https://elon.casino/image/vertical_2/9964.webp",
            title:"Game Console"
        },
        {
            id:4,
            image:"https://elon.casino/image/vertical_2/11281.webp",
            title:"Tablet"
        },
        {
            id:5,
            image:"https://elon.casino/image/vertical_2/9948.webp",
            title:"Tablet"
        },
        {
            id:6,
            image:"https://elon.casino/image/vertical_2/48100.webp",
            title:"Tablet"
        },
        {
            id:7,
            image:"https://elon.casino/image/vertical_2/7430.webp",
            title:"Tablet"
        },
        {
            id:8,
            image:"https://elon.casino/image/vertical_2/16435.webp",
            title:"Tablet"
        },
        {
            id:9,
            image:"https://elon.casino/image/vertical_2/16435.webp",
            title:"Tablet"
        },
        {
            id:10,
            image:"https://elon.casino/image/vertical_2/9962.webp",
            title:"Tablet"
        },
    ])
  return (
    <section className='pt-[20px] w-full'>
        <div className='flex justify-between items-center pb-[10px]'>
               <h1 className='flex justify-center items-center text-white gap-[7px] lg:gap-[10px] text-[14px] lg:text-[22px] xl:text-[25px] font-[600]'>
                         <SiLegacygames className='text-[18px] lg:text-[25px] text-bg6'/>
                     Game Show
                     </h1>
                     <NavLink className="text-bg5 tet-[13px] lg:text-[18px]">
                         View All
                     </NavLink>
        </div>
       <section>
       <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          300: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 7,
            spaceBetween: 10,
          },
          1300: {
            slidesPerView: 7,
            spaceBetween: 10,
          },
          1440: {
            slidesPerView: 7,
            spaceBetween: 10,
          },
        }}
        className="mySwiper"
        modules={[Autoplay]}
        autoplay
        ref={swiperRef}
        navigation={false}  // Disable default navigation since we're using custom buttons
      >
        {categoires?.map((data) => (
      <SwiperSlide key={data.id} className='w-full cursor-pointer'>
                           <div className='relative top-0 left-0 rounded-[7px] lg:rounded-[10px] overflow-hidden group'>
                                         <img  className='w-full h-[170px] xl:h-[260px] rounded-[7px] lg:rounded-[10px]' src={data.image} alt="" />
                                         <div className='absolute top-0 left-0 hidden  justify-center group-hover:flex bg-[rgba(0,0,0,0.4)] w-full h-full items-center'>
                                            <div className='p-[10px] lg:p-[15px] xl:p-[20px] bg-bg3 rounded-full text-[15px] lg:text-[25px]'>
                                            <FaPlay/>
                                            </div>
                                         </div>
                                         </div>
               </SwiperSlide>
        ))}
      </Swiper>
       </section>
    </section>
  )
}

export default Gameshows
