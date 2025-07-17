import React, { useEffect, useState } from 'react';
import CategoryCard from '../utility/CatagoryCard';

const CategorySection = () => {
    const [categories, setCategories] = useState([]);

    // Fetch the category data from category.json in the public folder
    useEffect(() => {
        fetch('category.json') // Fetching from the public folder
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((error) => {
                console.error("Error loading categories:", error);
            });
    }, []);

    return (
       <div className="w-full mx-auto my-10">
        <h1 className="text-4xl font-bold text-center my-10">Browse Categories</h1>
         <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {categories.map((category) => (
                <a href={category.category_link} key={category.id}>
                    <CategoryCard category={category} />
                </a>
            ))}
        </div>
       </div>
    );
};

export default CategorySection;
