import React from "react";
import Back from "./ClientComponents/Back";

function About() {
  return (
    <section className="min-h-screen bg-gray-50 pt-34 py-20 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        <Back />
        <h1 className="text-4xl font-bold mb-6">About Bookflix</h1>

        <p className="mb-6 text-gray-700 text-sm">
          Bookflix is a streaming platform dedicated to delivering an immersive
          and personalized entertainment experience to readers and book lovers
          alike. We combine curated video content, interactive storytelling, and
          original adaptations to bring your favorite stories to life.
        </p>

        <p className="mb-6 text-gray-700  text-sm">
          Our mission is to make literature accessible, engaging, and
          entertaining through a digital-first experience. Whether you want to
          explore author interviews, book adaptations, or exclusive Bookflix
          Originals, our platform is designed to connect you with stories you
          love.
        </p>

        <p className="mb-6 text-gray-700  text-sm">
          Bookflix is available on multiple devices, including smartphones,
          tablets, smart TVs, and computers. With personalized recommendations,
          multiple profiles, and offline downloads, we ensure that your reading
          and viewing experience is seamless and convenient.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-10  text-sm">
          <div className="bg-white p-6 rounded-2xl  border border-gray-400 ">
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p className="text-gray-700">
              To connect readers with stories they love by creating an
              innovative and immersive platform that blends video, literature,
              and interactive content.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-400  text-sm">
            <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
            <p className="text-gray-700">
              To become the leading platform for book-inspired entertainment
              worldwide, inspiring imagination, learning, and creativity for all
              ages.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center  text-sm">
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <ul className="space-y-2 list-decimal list-inside text-gray-700">
            <li>
              Accessibility: Making literature available anytime, anywhere.
            </li>
            <li> Innovation: Using technology to bring stories to life.</li>
            <li>Creativity: Encouraging imagination and exploration.</li>
            <li>
              Community: Connecting readers, authors, and creators globally.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;
