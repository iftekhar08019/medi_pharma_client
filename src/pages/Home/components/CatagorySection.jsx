import React from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { useTranslation } from "react-i18next";
import CategoryCard from "./CatagoryCard";

const CategorySection = () => {
  const axios = useAxios();
  const { t } = useTranslation();

  // Fetch categories from the API
  const { data: categories = [], isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get("/categories");
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center py-10">{t('common.loading')}</div>;
  if (isError) return <div className="text-center py-10 text-red-500">{t('common.error')}</div>;

  return (
    <div className="w-full mx-auto my-10" data-aos="fade-up">
      <h1 className="text-4xl font-bold text-center my-10">{t('home.categories.title')}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" data-aos="fade-up">
        {categories.map((category) => (
          <CategoryCard key={category._id?.$oid || category._id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
