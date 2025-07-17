import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

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
  return (
    <div className="relative rounded-xl overflow-hidden">
      <Swiper
        spaceBetween={50}
        fadeEffect={{ crossFade: true }}
        loop={true}
        autoplay={{
          delay: 3000,
        }}
        className="swiper-container rounded-xl"
      >
        {adsData.map((ad, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative min-h-[70vh] bg-cover bg-center rounded-xl"
              style={{
                backgroundImage: `url(${ad.img})`,
              }}
            >
              <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                <h2 className="text-3xl font-semibold">{ad.title}</h2>
                <p className="mt-4 text-lg">{ad.description}</p>
                <a
                  href="#"
                  className="mt-6 bg-[#396961] hover:bg-amber-400 hover:text-black text-white px-8 py-3 rounded-full text-xl"
                >
                  Shop Now
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
