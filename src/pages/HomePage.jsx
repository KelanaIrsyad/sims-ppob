import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { axiosInstance } from "../lib/Axios";
import Service from "../components/Service";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function HomePage() {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    async function fetchBanner() {
      try {
        const response = await axiosInstance.get("/banner");
        const data = response.data.data;
        setBanner(data);
      } catch (error) {
        console.error("Gagal fetch banner", error);
      }
    }
    fetchBanner();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />

      {/* Fitur */}
      <Service />

      {/* Banner */}
      <div className=" flex w-6xl mx-auto mt-5">
        <Swiper
          modules={[Navigation]}
          navigation
          slidesPerView={4}
          loop={true}
          className="w-full gap-2 mx-auto"
        >
          {banner.map((item) => (
            <SwiperSlide key={item.banner_name}>
              <img
                src={item.banner_image}
                alt={item.banner_name}
                className="rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default HomePage;
