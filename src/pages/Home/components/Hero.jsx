import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const Hero = () => {
  const axios = useAxios();

  const {
    data: adsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["ads"],
    queryFn: async () => {
      const response = await axios.get("/advertisements");
      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching ads</div>;
  const sliderAds = adsData.filter(ad => ad.showInSlider);
  return (
    <div className="relative rounded-xl overflow-hidden">
      <Swiper
        spaceBetween={50}
        fadeEffect={{ crossFade: true }}
        loop={true}
        autoplay={{
          delay: 3000,
        }}
        pagination={{
          clickable: true,
        }}
        className="hero-swiper rounded-xl"
      >
        {sliderAds.map((ad, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative min-h-[70vh] bg-cover bg-center rounded-xl"
              style={{
                backgroundImage: `url(${ad.img})`,
              }}
            >
              <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div>
              <div className="absolute inset-0 flex flex-col items-start justify-center text-left text-white px-8 md:px-16 lg:px-24">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold max-w-2xl mb-4">
                  {ad.title}
                </h2>
                <p className="mt-4 text-lg md:text-xl max-w-xl mb-6">
                  {ad.description}
                </p>
                <Link
                  to="/shops"
                  className="bg-[#396961] hover:bg-amber-400 hover:text-black text-white px-8 py-3 rounded-full text-xl transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <style>
        {`
          .hero-swiper .swiper-pagination {
            bottom: 20px !important;
          }
          .hero-swiper .swiper-pagination-bullet {
            width: 40px !important;
            height: 6px !important;
            border-radius: 3px !important;
            background: rgba(255, 255, 255, 0.5) !important;
            margin: 0 4px !important;
            transition: all 0.3s ease !important;
          }
          .hero-swiper .swiper-pagination-bullet-active {
            background: #ffffff !important;
            width: 60px !important;
          }
          .hero-swiper .swiper-pagination-bullet:not(.swiper-pagination-bullet-active) {
            width: 12px !important;
            height: 12px !important;
            border-radius: 50% !important;
          }
        `}
      </style>
    </div>
  );
};

export default Hero;
