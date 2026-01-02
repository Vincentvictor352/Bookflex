"use client";
import Loader from "@/helper/Loader";
import useContactform from "@/hooks/useContactform";

function ContactForm() {
  const { loader, formdata, onSubmit, handleChange } = useContactform();

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        onChange={handleChange}
        value={formdata.name}
        className="px-4 py-3 border outline-none focus:ring-2 text-black! placeholder:text-black focus:ring-black/30"
      />

      <input
        type="email"
        name="email"
        placeholder="Your Email Address"
        onChange={handleChange}
        value={formdata.email}
        className="px-4 py-3 border outline-none focus:ring-2 !
        text-black! placeholder:text-black focus:ring-black/30"
      />

      <textarea
        name="message"
        placeholder="Your message..."
        rows={6}
        onChange={handleChange}
        value={formdata.message}
        className="px-4 py-6 border outline-none focus:ring-2 focus:ring-black/30 placeholder:text-black resize-none"></textarea>

      <button
        disabled={loader}
        type="submit"
        className="px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed  bg-black text-white hover:bg-gray-900 transition">
        {loader ? <Loader /> : "Send Message"}
      </button>
    </form>
  );
}

export default ContactForm;
