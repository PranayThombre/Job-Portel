import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-12 mt-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-4">JobMitra</h2>
            <p className="text-sm leading-6">
              JobMitra is your trusted career partner. We connect talented
              professionals with the right opportunities, helping both companies
              and individuals grow.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-black mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-black">Home</a></li>
              <li><a href="/jobs" className="hover:text-black">Browse Jobs</a></li>
              <li><a href="/companies" className="hover:text-black">Companies</a></li>
              <li><a href="/about" className="hover:text-black">About Us</a></li>
              <li><a href="/contact" className="hover:text-black">Contact</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-black mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/blog" className="hover:text-black">Blog & Articles</a></li>
              <li><a href="/career-tips" className="hover:text-black">Career Tips</a></li>
              <li><a href="/faq" className="hover:text-black">FAQs</a></li>
              <li><a href="/privacy" className="hover:text-black">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-black">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-black mb-4">Contact Us</h3>
            <p className="text-sm">123 Job Street, Pune, India</p>
            <p className="text-sm">Email: support@jobmitra.com</p>
            <p className="text-sm">Phone: +91 98765 43210</p>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" className="hover:text-white" aria-label="Facebook">
                <i className="fab fa-facebook-f text-lg"></i>
              </a>
              <a href="https://twitter.com" className="hover:text-white" aria-label="Twitter">
                <i className="fab fa-twitter text-lg"></i>
              </a>
              <a href="https://linkedin.com" className="hover:text-white" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in text-lg"></i>
              </a>
              <a href="https://instagram.com" className="hover:text-white" aria-label="Instagram">
                <i className="fab fa-instagram text-lg"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} JobMitra. All Rights Reserved.</p>
          <p>Designed with ❤️ by Pranay Thombre</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
