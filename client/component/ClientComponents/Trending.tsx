"use client";
import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// Swiper modules
import { EffectCoverflow, Pagination } from "swiper/modules";

const books = [
  {
    id: 1,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    cover: "/dummy/thought-catalog-V5BGaJ0VaLU-unsplash (1).jpg",
    rating: 4.8,
  },
  {
    id: 1,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    cover: "/dummy/thought-catalog-V5BGaJ0VaLU-unsplash (1).jpg",
    rating: 4.8,
  },
  {
    id: 1,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    cover: "/dummy/thought-catalog-V5BGaJ0VaLU-unsplash (1).jpg",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    cover: "/dummy/surja-sen-das-raj-ViMrMawjj7s-unsplash.jpg",
    rating: 4.9,
  },
  {
    id: 3,
    title: "It Ends With Us",
    author: "Colleen Hoover",
    cover: "/dummy/sincerely-media-CXYPfveiuis-unsplash.jpg",
    rating: 4.7,
  },
  {
    id: 4,
    title: "The Alchemist",
    author: "Paulo Coelho",
    cover: "/dummy/thought-catalog-V5BGaJ0VaLU-unsplash.jpg",
    rating: 4.6,
  },
  {
    id: 5,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    cover: "/dummy/thought-catalog-V5BGaJ0VaLU-unsplash.jpg",
    rating: 4.8,
  },
];

export default function Trending() {
  return (
    <section className="bg-[#000000] text-white py-16 px-6 md:px-20 border-t-4 border-pink-600 rounded-t-[60px] -mt-16">
      <div className="mb-10 ">
        <h1 className="text-3xl font-bold  tracking-tight">Trending Books</h1>
        <p className="text-gray-400 text-sm mt-2">
          Discover the most popular books everyone is reading now
        </p>
      </div>

      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={false}
        slidesPerView={"auto"}
        spaceBetween={30}
        coverflowEffect={{
          rotate: 40,
          stretch: 0,
          depth: 120,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper max-w-6xl mx-auto">
        {books.map((book, index) => (
          <SwiperSlide
            key={`${book.id}-${index}`}
            className="w-[200px]! md:w-[250px]! lg:w-[280px]!">
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg">
              <Image
                src={book.cover}
                alt={book.title}
                width={200}
                height={280}
                className="rounded-lg w-full h-60 object-cover"
              />
              <h2 className="text-lg font-semibold mt-3 truncate">
                {book.title}
              </h2>
              <p className="text-gray-400 text-sm">{book.author}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-300">{book.rating}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
