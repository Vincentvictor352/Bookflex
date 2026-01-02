import Image from "next/image";
import React from "react";

const dummy = [
  {
    title: "Atomic habit",
    author: "victor kenechukwu",
    coverimage: "/dummy/tim-alex-1i-P178kxHQ-unsplash.jpg",
  },
];

function Cover_components() {
  return (
    <main className="px-2">
      {" "}
      <h1 className="text-2xl font-Tagesschrift dark:text-white mb-4">
        Top Read book
      </h1>
      <div className="flex justify-center ">
        {dummy.map((book, index) => (
          <div
            key={index}
            className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
            {/* Cover image */}
            <Image
              src={book.coverimage}
              alt={book.title}
              fill
              className="object-cover"
            />

            {/* Overlay text */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm text-white p-4">
              <h2 className="text-lg font-bold">Title : {book.title}</h2>
              <p className="text-xs">Author : {book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Cover_components;
