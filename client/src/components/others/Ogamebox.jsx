import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Pagination,Autoplay} from 'swiper/modules';
import { GoStarFill } from "react-icons/go";
import { NavLink } from 'react-router-dom';
import { FaPlay } from "react-icons/fa";
const Ogamesbox = () => {
    const swiperRef = useRef(null);
    
    const [categoires,set_categories]=useState([
        {
            id:1,
            image:"https://script.viserlab.com/xaxino/demo/assets/images/game/6592b9b5aace01704114613.png",
            slug:"head_tail"
        },
        {
            id:2,
            image:"https://script.viserlab.com/xaxino/demo/assets/images/game/61051d8469d731627725188.jpg",
            slug:"spin_game"
        },
        {
            id:3,
            image:"https://elon.casino/image/vertical_2/3712.webp",
            title:"Game Console",
            slug:"head_tail"
        },
        {
            id:4,
            image:"https://elon.casino/image/vertical_2/39889.webp",
            title:"Tablet",
            slug:"head_tail"
        },
        {
            id:5,
            image:"https://elon.casino/image/vertical_2/43020.webp",
            title:"Tablet",
            slug:"head_tail"
        },
        {
            id:6,
            image:"https://elon.casino/image/vertical_2/48100.webp",
            title:"Tablet",
            slug:"head_tail"
        },
        {
            id:7,
            image:"https://elon.casino/image/vertical_2/28112.webp",
            title:"Tablet",
            slug:"head_tail"
        },
        {
            id:8,
            image:"https://elon.casino/image/vertical_2/39892.webp",
            title:"Tablet",
            slug:"head_tail"
        },
        {
            id:9,
            image:"https://elon.casino/image/vertical_2/13122.webp",
            title:"Tablet",
            slug:"head_tail"
        },
        {
            id:10,
            image:"https://elon.casino/image/vertical_2/10245.webp",
            title:"Tablet",
            slug:"head_tail"
        },
        {
            id:1,
            image:"https://script.viserlab.com/xaxino/demo/assets/images/game/6592b9b5aace01704114613.png",
            slug:"head_tail"
        },
        {
            id:2,
            image:"https://script.viserlab.com/xaxino/demo/assets/images/game/61051d8469d731627725188.jpg",
            slug:"spin_game"
        },
        {
            id:3,
            image:"https://elon.casino/image/vertical_2/3712.webp",
            title:"Game Console",
            slug:"head_tail"
        },
        {
            id:4,
            image:"https://elon.casino/image/vertical_2/39889.webp",
            title:"Tablet",
            slug:"head_tail"
        },
        {
            id:5,
            image:"https://elon.casino/image/vertical_2/43020.webp",
            title:"Tablet",
            slug:"head_tail"
        },
        {
            id:6,
            image:"https://elon.casino/image/vertical_2/48100.webp",
            title:"Tablet",
            slug:"head_tail"
        },
        {
            id:7,
            image:"https://elon.casino/image/vertical_2/28112.webp",
            title:"Tablet",
            slug:"head_tail"
        },
        {
            id:8,
            image:"https://elon.casino/image/vertical_2/39892.webp",
            title:"Tablet",
            slug:"head_tail"
        },
        {
            id:9,
            image:"https://elon.casino/image/vertical_2/13122.webp",
            title:"Tablet",
            slug:"head_tail"
        },
        {
            id:10,
            image:"https://elon.casino/image/vertical_2/10245.webp",
            title:"Tablet",
            slug:"head_tail"
        },
        {
            id:1,
            image:"https://script.viserlab.com/xaxino/demo/assets/images/game/6592b9b5aace01704114613.png",
            slug:"head_tail"
        },
        {
            id:2,
            image:"https://script.viserlab.com/xaxino/demo/assets/images/game/61051d8469d731627725188.jpg",
            slug:"spin_game"
        },
        {
            id:3,
            image:"https://elon.casino/image/vertical_2/3712.webp",
            title:"Game Console",
            slug:"head_tail"
        },
        {
            id:4,
            image:"https://elon.casino/image/vertical_2/39889.webp",
            title:"Tablet",
            slug:"head_tail"
        },
        {
            id:5,
            image:"https://elon.casino/image/vertical_2/43020.webp",
            title:"Tablet",
            slug:"head_tail"
        },
        {
            id:6,
            image:"https://elon.casino/image/vertical_2/48100.webp",
            title:"Tablet",
            slug:"head_tail"
        },
        {
            id:7,
            image:"https://elon.casino/image/vertical_2/28112.webp",
            title:"Tablet",
            slug:"head_tail"
        },
        {
            id:8,
            image:"https://elon.casino/image/vertical_2/39892.webp",
            title:"Tablet",
            slug:"head_tail"
        },
        {
            id:9,
            image:"https://elon.casino/image/vertical_2/13122.webp",
            title:"Tablet",
            slug:"head_tail"
        },
        {
            id:10,
            image:"https://elon.casino/image/vertical_2/10245.webp",
            title:"Tablet",
            slug:"head_tail"
        },
    ])
  return (
    <section className='pt-[20px] w-full'>
        <div className='flex justify-between items-center pb-[10px]'>
            <h1 className='flex justify-center items-center text-white gap-[10px] text-[25px] font-[600]'>
                <GoStarFill className='text-[25px] text-bg6'/>
            Popular
            </h1>
            <NavLink className="text-bg5 text-[18px]">
                View All
            </NavLink>
        </div>
       <section className='grid lg:grid-cols-5 xl:grid-cols-6 gap-[20px]'>
    
        {categoires?.map((data) => (
       <NavLink to={`/games/${data.slug}`}>
       <div className='relative top-0 left-0 rounded-[10px] overflow-hidden group'>
       <img  className='w-full h-[200px] xl:h-[260px] rounded-[10px]' src={data.image} alt="" />
       <div className='absolute top-0 left-0 hidden  justify-center group-hover:flex bg-[rgba(0,0,0,0.4)] w-full h-full items-center'>
          <div className='p-[20px] bg-bg3 rounded-full text-[25px]'>
          <FaPlay/>
          </div>
       </div>
       </div>
     </NavLink>
        ))}
       </section>
    </section>
  )
}

export default Ogamesbox
