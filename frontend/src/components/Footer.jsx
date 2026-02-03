import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  if (location.pathname === '/cart') {
    return null;
  }

  return (
    <footer className="bg-techmart-color text-gray-300">
      <div className="max-w-7xl mx-auto px-6">

        {/* 🔹 Mobile Footer */}
        <div className="lg:hidden py-6 text-center text-sm space-y-2">
          <p className="text-white font-semibold">TechMart</p>
          <div className="flex justify-center gap-4 text-xs">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Help</span>
          </div>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} TechMart
          </p>
        </div>

        {/* 🔹 Desktop Footer */}
        <div className="hidden lg:grid grid-cols-4 gap-8 py-10">

          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-white">TechMart</h2>
            <p className="text-sm mt-3">
              Your one-stop shop for the latest tech products.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-white font-semibold mb-3">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>Laptops</li>
              <li>Mobiles</li>
              <li>Accessories</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>About</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>Help Center</li>
              <li>Returns</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

        </div>

        {/* Desktop Bottom */}
        <div className="hidden lg:block border-t border-white/20 py-6 text-center text-sm">
          © {new Date().getFullYear()} TechMart. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
