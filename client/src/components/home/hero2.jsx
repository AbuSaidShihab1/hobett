import React,{useState,useEffect} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination,Autoplay,Navigation} from 'swiper/modules';

const Hero = () => {
    const images=[
        "https://jiliwin.9terawolf.com/cms/banner/image/bd-desktop-66c2c5680c279.jpg",
        "https://jiliwin.9terawolf.com/cms/banner/image/bd-desktop-65938d6405590.jpg",
        "https://jiliwin.9terawolf.com/cms/banner/image/bd-desktop-667e3b922437d.jpg",
        "https://jiliwin.9terawolf.com/cms/banner/image/en-dekstop-679ce5ec2e928.svg",
        "https://jiliwin.9terawolf.com/cms/banner/image/bd-desktop-679daca5b8e1c.jpg",
        "https://jiliwin.9terawolf.com/cms/banner/image/bd-desktop-674d6840aed86.jpg"
    ]
    // ----------------game-data-----------------------
    const games=[
        { "name": "BB88 Super Ace", "provider": "JILI", "image": "https://jiliwin.9terawolf.com/cms/h8/image/64a539ee6739e.png" },
        { "name": "BB88 Crash Cricket", "provider": "JILI", "image": "https://luckmedia.link/spb_aviator/thumb.webp" },
        { "name": "Super Ace", "provider": "JILI", "image": "https://jiliwin.9terawolf.com/cms/babu/image/super_ace.png" },
        { "name": "Aviator", "provider": "SPRIBE", "image": "https://jiliwin.9terawolf.com/cms/h8/image/67906ccc5bfee.png" },
        { "name": "Fortune Gems 2", "provider": "JILI", "image": "https://jiliwin.9terawolf.com/cms/babu/image/bb88_super_ace.png" },
        { "name": "Crazy Time", "provider": "", "image": "https://jiliwin.9terawolf.com/cms/babu/image/bb88_super_ace.png" },
        { "name": "Evo Funky Time", "provider": "", "image": "https://jiliwin.9terawolf.com/images/babu/game_icons/en/jili/77_0.jpg" },
        { "name": "Boxing King", "provider": "", "image": "https://jiliwin.9terawolf.com/cms/babu/image/bb88_super_ace.png" },
        { "name": "Money Coming", "provider": "", "image": "https://jiliwin.9terawolf.com/cms/babu/image/bb88_super_ace.png" },
        { "name": "Super Ace Deluxe", "provider": "", "image": "https://jiliwin.9terawolf.com/cms/babu/image/bb88_super_ace.png" }
      ];      
      const slider_images = [
        "https://jiliwin.9terawolf.com/images/babu/banner/ambas/bb88_banner-GCJ.jpg",
        "https://jiliwin.9terawolf.com/images/babu/banner/ambas/bb88_banner-CS.jpg",
        "https://jiliwin.9terawolf.com/images/babu/banner/ambas/bb88_banner-RK.jpg",
      ];
      const [currentIndex, setCurrentIndex] = useState(0);

      const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? slider_images.length - 1 : prevIndex - 1));
      };
    
      const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === slider_images.length - 1 ? 0 : prevIndex + 1));
      };
    
      useEffect(() => {
        const interval = setInterval(() => {
          nextSlide();
        }, 3000);
        return () => clearInterval(interval);
      }, [currentIndex]);
    
  return (
   <section>
     <section>
               <Swiper
      slidesPerView={1}
        spaceBetween={10}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          grabCursor={true}
          modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper w-full"
      >
        {
            images.map((data)=>{
                return(
                    <SwiperSlide>
                    <div className='w-full'>
                         <img className='w-full h-[100%]' src={data} alt="" />
                    </div>
               </SwiperSlide>
                )
            })
        }
      </Swiper>
    </section>
    <section className='w-full py-[15px]'>
        <section className='w-[77%] m-auto'>
            <marquee behavior="" direction="" className="bg-[#333333] px-[20px] py-[10px] rounded-[10px] text-white">
            :প্রিয় সদস্যরা, আপনার অ্যাকাউন্ট সুরক্ষিত নিশ্চিত করতে দয়া করে আপনার লগইন ডিটেলস , অর্থপ্রদানের রসিদ(ক্যাশ আউট এর ছবি ) এবং ওটিপি কারও সাথে শেয়ার করবেন না। আপনার যদি সহায়তার প্রয়োজন হয়, তাহলে লাইভচ্যাটের মাধ্যমে আমাদের সাথে যোগাযোগ করুন।
            </marquee>
            <section className='mt-[20px]'>
            <img src="https://jiliwin.9terawolf.com/images/babu/banner/register_banner_home.jpg" alt="" />
            </section>
        {/* -----------------------hot-games------------------- */}
            <section className='py-[20px]'>
            <h2 className='text-[22px] mb-[20px]'>হট গেমস</h2>
            {/* ===================games============================ */}
              <section className='grid grid-cols-5 gap-[20px] '>
                {
                    games.map((data)=>{
                        return(
                            <div>
                                <div className='relative font-poppins group cursor-pointer'>
                                    <img className='rounded-[10px] w-full h-[170px]' src={data.image} alt="" />
                                  <div className='absolute group-hover:w-full w-0 h-full top-0 left-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center'>
                                    <img className='cursor-pointer' src="https://www.babu88h.com/static/svg/play_btn_hover.svg" alt="" />
                                  </div>
                                </div>
                                <h2 className=' mt-[10px] text-[17px] font-[500]'>{data.name}</h2>
                                <h3 className='text-[14px]'>{data.provider}</h3>
                            </div>
                        )
                    })
                }
              </section>
            {/* ===============================games==================== */}
            </section>
        {/* -----------------------hot-games------------------- */}
           {/* ----------------------custom-slider----------------- */}
           <section>
           <div className=" rounded-lg relative shadow-lg">
      {/* Slider Section */}
      <div className="relative w-full h-full overflow-hidden">
        <img
          src={images[currentIndex]}
          alt="Slider Image"
          className="w-full h-[350px] rounded-lg transition-transform duration-500"
        />

        <div className="flex justify-center absolute bottom-[5%] left-[1%] mt-2 space-x-2">
          {images.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentIndex ? "bg-yellow-500 scale-110" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>
      </div>
      
      {/* Video Section */}
      <div className="w-[30%] absolute top-0 h-full right-0  px-[30px] flex justify-end items-center">
        <iframe
          className="w-[100%] h-[80%] rounded-lg"
          src="https://www.youtube.com/embed/yV8OOraIC34"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
           </section>
           {/* ----------------------custom-slider----------------- */}

           {/* --------------------banner---------------------- */}
            <section className='w-full  py-[30px] font-poppins  flex justify-center items-center gap-[20px]'>
                <div className='w-[60%] h-[250px] rounded-[10px] flex justify-start items-center p-[20px] overflow-hidden bg-[url("https://www.babu88h.com/static/image/homepage/refer_banner.jpg")] bg-cover bg-no-repeat'>
                   <div className='w-[60%]'>
                    <h1 className='text-[22px] font-[500] text-white mb-[7px]'>Refer friends and start earning</h1>
                    <p className='text-[14px] text-white mb-[20px]'>The No.1 friend referral program in Bangladesh is here! Earn free ৳500 when your refer a friend and also earn lifetime commission of up to 2% for every deposit your friend makes!</p>
                    <button className='px-[20px] py-[8px] bg-brand_color text-black rounded-full text-[15px] font-[500]'>Refer Now</button>
                   </div>
                </div>
                <div className='w-[40%] h-[250px] rounded-[10px] overflow-hidden' >
                           <img className='w-full h-full' src="https://www.babu88h.com/static/image/homepage/bb88_bp_1400_560.jpg" alt="" />
                </div>
            </section>
           {/* -------------------banner----------------------- */}
           {/* -----------------apps-download--------------------- */}
            <section className='w-full py-[30px]'>
                        <img src="https://www.babu88h.com/static/image/banner/downloadClient/bdt/bd_bb88_downloadnow_appbanner_desktop.jpg" alt="" />
            </section>
           {/* -----------------apps-download--------------------- */}
        </section>
    </section>
   </section>
  )
}

export default Hero
