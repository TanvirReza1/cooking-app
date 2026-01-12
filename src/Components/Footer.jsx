import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../assets/Logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-3">
            <img src={logo} alt="logo" className="w-10 h-10 rounded-full" />
            <h2 className="text-2xl font-bold text-white">GhoreyRanna</h2>
          </Link>
          <p className="text-gray-400 text-sm leading-6">
            Homemade meals delivered fresh from local chefs around you.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-white">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Hours + Social */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Working Hours
          </h3>
          <p className="text-gray-400 text-sm">Mon–Fri: 9 AM – 10 PM</p>
          <p className="text-gray-400 text-sm">Saturday: 10 AM – 8 PM</p>
          <p className="text-gray-400 text-sm mb-4">Sunday: Closed</p>

          <h3 className="text-xl font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl">
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
              <FaInstagram />
            </a>
            <a
              href="https://x.com/reza_tanvi18747"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 py-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} GhoreyRanna — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
