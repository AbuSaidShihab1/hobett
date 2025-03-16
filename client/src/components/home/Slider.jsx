import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";  // Make sure axios is imported

const Slider = () => {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get("http://localhost:8080/admin/banners");
        setBanners(response.data.filenames || []); // Set filenames as banners
        console.log(response);  // For debugging
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  // Adjust number of slides per view on window resize
  useEffect(() => {
    const updateSlidesPerView = () => {
      setSlidesPerView(window.innerWidth < 768 ? 1 : 3);
    };
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  // Set up auto slide rotation
  const totalSlides = Math.ceil(banners.length / slidesPerView);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <motion.div
            key={index}
            className={`flex-shrink-0 px-2`}
            style={{ width: `${100 / slidesPerView}%` }}
          >
            <img
              src={`http://localhost:8080/images/${banner}`} // Assuming the banners are stored under /uploads/
              className="w-full h-[200px] md:h-[250px] rounded-lg"
              alt={`banner-${index}`}
            />
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center space-x-2 mt-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-2 rounded-full transition-all duration-300 ${
              current === index ? "bg-bg5 w-6" : "bg-gray-200"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
