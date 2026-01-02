import Image from "next/image";
import React from "react";

const newRelease = [
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    coverimage: "/dummy/surja-sen-das-raj-ViMrMawjj7s-unsplash.jpg",
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    coverimage: "/dummy/thought-catalog-V5BGaJ0VaLU-unsplash.jpg",
  },
  {
    title: "Deep Work 2",
    author: "Cal Newport",
    coverimage: "/dummy/thought-catalog-V5BGaJ0VaLU-unsplash.jpg",
  },
  {
    title: "testing mic",
    author: "Cal Newport",
    coverimage: "/dummy/thought-catalog-V5BGaJ0VaLU-unsplash.jpg",
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    coverimage: "/dummy/thought-catalog-V5BGaJ0VaLU-unsplash.jpg",
  },
];

export default function NewRelease() {
  return (
    <section className="mb-8 px-2">
      <h1 className="text-2xl dark:text-white font-Tagesschrift mt-7">
        New Release
      </h1>
      <div className="grid grid-cols-2 gap-3">
        {newRelease.map((book, index) => (
          <div
            key={index}
            className="relative min-w-[150px] h-72 rounded-lg overflow-hidden shadow-lg ">
            <Image
              src={book.coverimage}
              alt={book.title}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm text-white p-2">
              <h2 className="text-sm font-bold">{book.title}</h2>
              <p className="text-xs">{book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
