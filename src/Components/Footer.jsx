import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../assets/Logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="w-10 h-10 rounded-full" />
            <h2 className="text-2xl font-bold text-white mb-3">GhoreyRanna</h2>
          </Link>

          <p className="text-gray-400 text-sm leading-6">
            Homemade meals delivered fresh from local chefs around you. Eat
            healthy, support local cooks.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
          <p className="flex items-center gap-2 mb-2">
            <FaPhoneAlt /> +880 1797-421860
          </p>
          <p className="flex items-center gap-2">
            <MdEmail /> ghoreyranna@gmail.com
          </p>
          <p className="mt-3 text-gray-400 text-sm">
            Mirpur-10, Dhaka, Bangladesh
          </p>
        </div>

        {/* Working Hours + Social */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Working Hours
          </h3>
          <p className="text-gray-400 text-sm">Mon - Fri: 9:00 AM - 10:00 PM</p>
          <p className="text-gray-400 text-sm">Saturday: 10:00 AM - 8:00 PM</p>
          <p className="text-gray-400 text-sm mb-4">Sunday: Closed</p>

          <h3 className="text-xl font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex items-center gap-4 text-xl">
            <a
              href="https://www.facebook.com/Tanvirhossain.reza/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>

            <a
              href="https://www.instagram.com/tanvir_reza04/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="hover:text-white duration-200" />
            </a>

            <a
              href="https://x.com/reza_tanvi18747"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter className="hover:text-white duration-200" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-700 py-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} GhoreyRanna — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
