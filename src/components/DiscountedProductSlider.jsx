import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import DiscountedProductCard from "../utility/DiscountedProductCard";

const DiscountProductsSlider = () => {
  const [products, setProducts] = useState([]);

  // Fetch JSON data from public folder
  useEffect(() => {
    fetch("/discounted.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <section className="w-full mx-auto my-10" data-aos="fade-up">
      <h1 className="text-4xl font-bold text-center my-10">Find Our Discount Products</h1>
      <div className="mx-auto">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={32} // More space between cards
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          grabCursor={true}
          loop={true}
          breakpoints={{
            480: { slidesPerView: 1 },
            640: { slidesPerView: 1.2 },   // partial view on small
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 }
          }}
          className="!px-2"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="flex justify-between items-center">
              <DiscountedProductCard
                {...product}
                onView={() => alert(`View: ${product.name}`)}
                onAddToCart={() => alert(`Added to cart: ${product.name}`)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default DiscountProductsSlider;
