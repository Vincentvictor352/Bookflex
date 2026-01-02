import {
  Mail,
  Phone,
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";
import ContactForm from "./ClientComponents/ContactForm";
import Back from "./ClientComponents/Back";

function Contact() {
  return (
    <section className="relative w-full  min-h-screen bg-gray-100   pt-34 py-20 px-4 md:px-20">
      <article className="">
        <Back />
        <main className=" w-full   rounded-2xl  grid md:grid-cols-2 gap-10">
          {/* Left side */}
          <div>
            <h1 className="text-4xl font-bold">Contact Us</h1>
            <p className="text-sm mt-3 text-gray-600">
              Tell us a bit about us or inquiry, and our team will reach out
              with tailored guidance. Whether you're looking for product
              support, partnership opportunities, or general assistance, we’re
              here to help. Your message is important to us — expect a response
              within 24 hours.
            </p>

            <ul className="mt-6 space-y-3 text-gray-700">
              <li className="font-medium flex items-center gap-x-3">
                <Mail size={15} /> Email: contactus@gmail.com
              </li>
              <li className="font-medium flex items-center gap-x-3">
                <Phone size={15} /> Phone: 0803333333
              </li>
              <li className="font-medium flex items-center gap-x-3">
                <Facebook size={15} /> Facebook:{" "}
                <a
                  href="https://facebook.com/yourpage"
                  className="text-blue-600 hover:underline">
                  yourpage
                </a>
              </li>
              <li className="font-medium flex items-center gap-x-3">
                <Linkedin size={15} /> LinkedIn:{" "}
                <a
                  href="https://linkedin.com/in/yourprofile"
                  className="text-blue-700 hover:underline">
                  yourprofile
                </a>
              </li>
              <li className="font-medium flex items-center gap-x-3">
                <Twitter size={15} /> Twitter:{" "}
                <a
                  href="https://twitter.com/yourhandle"
                  className="text-blue-500 hover:underline">
                  @yourhandle
                </a>
              </li>
              <li className="font-medium flex items-center gap-x-3">
                <Instagram size={15} /> Instagram:{" "}
                <a
                  href="https://instagram.com/yourhandle"
                  className="text-blue-500 hover:underline">
                  @yourhandle
                </a>
              </li>
            </ul>
          </div>

          {/* Right side form */}
          <ContactForm />
        </main>
        <p className="mt-10 text-sm text-gray-600  leading-relaxed">
          You can also connect with us on our social media platforms for quick
          replies and real-time updates. We share product announcements, feature
          releases, community highlights, and behind-the-scenes insights into
          what we’re building. Whether you prefer sending a direct message,
          leaving a comment, or simply following our journey, we’re always
          excited to engage with you. Our social channels are open for
          collaboration inquiries, support, or general questions. Feel free to
          reach out — we value every interaction and look forward to connecting
          with you.
        </p>
      </article>
    </section>
  );
}

export default Contact;
