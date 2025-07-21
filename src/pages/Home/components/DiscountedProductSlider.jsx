import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import DiscountedProductCard from "./DiscountedProductCard";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const DiscountProductsSlider = () => {
  const axios = useAxios();

  const {
    data: allProducts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get("/products");
      return response.data;
    },
  });

  // Filter only discounted products
  const discountedProducts = allProducts?.filter(product => 
    product.discounted === true || product.discountPrice || product.discountPercent
  ) || [];

  if (isLoading) return (
    <section className="w-full mx-auto my-10" data-aos="fade-up">
      <h1 className="text-4xl font-bold text-center my-10">Find Our Discount Products</h1>
      <div className="text-center text-gray-600">Loading discounted products...</div>
    </section>
  );

  if (isError) return (
    <section className="w-full mx-auto my-10" data-aos="fade-up">
      <h1 className="text-4xl font-bold text-center my-10">Find Our Discount Products</h1>
      <div className="text-center text-red-600">Error loading discounted products</div>
    </section>
  );

  if (!discountedProducts.length) return (
    <section className="w-full mx-auto my-10" data-aos="fade-up">
      <h1 className="text-4xl font-bold text-center my-10">Find Our Discount Products</h1>
      <div className="text-center text-gray-600">No discounted products available at the moment</div>
    </section>
  );

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
          {discountedProducts.map((product) => (
            <SwiperSlide key={product._id || product.id} className="flex justify-between items-center">
              <DiscountedProductCard
                image={product.imageUrl}
                name={product.name}
                price={product.discountPrice || product.price}
                oldPrice={product.discounted ? product.price : null}
                discount={product.discountPercent ? `${product.discountPercent}% OFF` : "SALE"}
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
