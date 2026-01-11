import Image from "next/image";
import { Heart } from "lucide-react";

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
  // const [favorites, setFavorites] = useState<any[]>([]);

  // const toggleFavorite = async (bookId: any) => {
  //   const isFav = favorites.includes(bookId);

  //   await fetch("http://localhost:5000/api/favorites", {
  //     method: isFav ? "DELETE" : "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ bookId }),
  //   });

  //   setFavorites((prev: any) =>
  //     isFav ? prev.filter((id: any) => id !== bookId) : [...prev, bookId]
  //   );
  // };

  return (
    <section className="mb-8 px-2">
      <h1 className="text-2xl dark:text-white mt-7">New Release</h1>

      <div className="grid_1">
        {newRelease.map((book, index) => {
          // const isFav = favorites.includes(book.id);

          return (
            <div
              key={index}
              className="relative min-w-[150px] h-72 rounded-lg overflow-hidden shadow-lg">
              {/* Favorite Icon */}
              <button
                // onClick={() => toggleFavorite(book.id)  }
                className="absolute top-2 right-2 z-10 bg-black/60 p-2 rounded-full">
                <Heart size={18} />
              </button>

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
          );
        })}
      </div>
    </section>
  );
}
