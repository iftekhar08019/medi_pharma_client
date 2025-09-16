import React from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

const CategoryCard = ({ category }) => {
  const { t } = useTranslation();

  // Normalize incoming data (supports both legacy and current shapes)
  const name = (category.categoryName || category.category_name || "").toString();
  const image = category.categoryImage || category.image_url;
  const count = category.medicineCount ?? category.medicine_count ?? 0;
  const link = `/category/${encodeURIComponent(name)}`;

  return (
    <div
      className="relative w-[90%] sm:w-[95%] md:w-full mx-auto transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02]"
    >
      {/* Card */}
      <div className="bg-[#CEDDD1] rounded-2xl shadow-xl overflow-hidden group">
        {/* Decorative gradient sheen */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "radial-gradient(1200px 200px at 0% 0%, rgba(255,255,255,0.25), transparent 60%)" }} />

        {/* Image area */}
        <div className="flex items-center justify-center pt-8 pb-4 relative">
          <div className="relative">
            {/* Gradient ring */}
            <div className="p-1 rounded-full" style={{ background: "linear-gradient(135deg, #eaf3ec, #9fc9b8)" }}>
              <div className="rounded-full bg-[#CEDDD1] p-1">
                <img
                  src={image}
                  alt={name}
                  className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 text-center">
          <h3 className="text-xl font-extrabold tracking-wide text-black">{name.toUpperCase()}</h3>
          <div className="mt-2 inline-flex items-center gap-2 bg-white/70 text-black px-3 py-1 rounded-full border border-white/60 shadow-sm">
            <span className="text-sm font-semibold">{count}</span>
            <span className="text-xs uppercase tracking-wide opacity-80">{t('common.quantity')}</span>
          </div>

          <div className="mt-6 flex justify-center">
            <Link
              to={link}
              className="relative inline-flex items-center justify-center px-6 py-2 rounded-full text-white bg-[#396961] hover:bg-amber-400 hover:text-black transition-colors duration-300 shadow-md"
            >
              {t('common.view')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
