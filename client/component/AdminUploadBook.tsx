"use client";

import { useState } from "react";

const categories = [
  "Thriller",
  "Horror",
  "Psychological Drama",
  "Romance",
  "Short Stories",
  "Urban Fiction",
  "Mystery",
  "Inspirational",
];

export default function AdminUploadBook() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    isFeatured: false,
  });

  const [book, setBook] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book || !cover) return alert("Book & cover required");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("author", form.author);
    formData.append("category", form.category);
    formData.append("isFeatured", String(form.isFeatured));
    formData.append("book", book);
    formData.append("cover", cover);

    try {
      setLoading(true);
      const res = await fetch("/api/books/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Book uploaded successfully ✅");
    } catch (err: any) {
      alert(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" space-y-4  ">
      <h2 className="text-xl font-semibold mb-4">Upload New Book</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Book title"
          required
          className="   w-48          
    sm:w-48       
    md:w-64  mx-2 rounded-lg border border-gray-300  dark:border-neutral-700 
          bg-transparent px-4 py-2 text-sm dark:text-white
          focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          type="text"
          placeholder="Author"
          required
          className="   w-48          
    sm:w-48       
    md:w-64   rounded-lg border border-gray-300 mx-2 dark:border-neutral-700 
          bg-transparent px-4 py-2 text-sm dark:text-white
          focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />

        <div className="relative w-64">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full rounded-lg border border-gray-300 dark:border-neutral-700
              bg-white dark:bg-neutral-900 text-left px-4 py-2 text-sm dark:text-white
              focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white">
            {form.category || "Select category"}
          </button>

          {dropdownOpen && (
            <div
              className="absolute z-10 mt-1 w-full rounded-lg border border-gray-300 dark:border-neutral-700
              bg-white dark:bg-neutral-900 shadow-lg max-h-60 overflow-auto">
              {categories.map((cat) => (
                <div
                  key={cat}
                  onClick={() => {
                    setForm({ ...form, category: cat });
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-2 text-sm text-black dark:text-white cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-700">
                  {cat}
                </div>
              ))}
            </div>
          )}
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="rounded-lg border      border-gray-300 dark:border-neutral-700 
          bg-transparent px-4 py-2 text-sm dark:text-black
          focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
          />
          <span>Featured book</span>
        </label>

        <div>
          <label className="block text-sm mb-1">Book PDF</label>
          <input
            type="file"
            className="rounded-lg border    w-48          
    sm:w-48       
    md:w-64   border-gray-300 dark:border-neutral-700   dark:text-white
          bg-transparent px-4 py-2 text-sm 
          focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            accept="application/pdf"
            required
            onChange={(e) => setBook(e.target.files?.[0] || null)}
          />
        </div>

        {/* Cover Image */}
        <div className="space-y-2">
          <label className="block text-sm">Cover Image</label>

          {/* Preview */}
          {coverPreview && (
            <div className="w-40 h-56 rounded-lg overflow-hidden border border-gray-300 dark:border-neutral-700">
              <img
                src={coverPreview}
                alt="Cover preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            required
            className=" rounded-lg border    w-48          
    sm:w-48       
    md:w-64   border-gray-300 dark:border-neutral-700 
            px-3 py-2 text-sm"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              setCover(file);
              setCoverPreview(URL.createObjectURL(file));
            }}
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-lg disabled:opacity-50">
          {loading ? "Uploading..." : "Upload Book"}
        </button>
      </form>
    </div>
  );
}
