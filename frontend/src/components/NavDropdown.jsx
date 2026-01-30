import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const NavDropdown = ({ title, items }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="relative flex" ref={ref}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-medium text-white hover:font-bold"
      >
        {title}
        <span className="text-xs">▼</span>
      </button>

      {/* Menu */}
      {open && (
        <div className="absolute mt-9 border border-gray-300 text-gray-800 w-40 rounded-sm bg-white shadow-lg">
          {items.map((item, index) =>
            item.link ? (
              <Link
                key={index}
                to={item.link}
                onClick={() => setOpen(false)}
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
