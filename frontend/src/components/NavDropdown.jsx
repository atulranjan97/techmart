import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

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
        className="flex items-center gap-1 text-sm font-medium text-white cursor-pointer"
      >
        {title}
        {/* <span className="text-xs">▼</span> */}
        <span className="text-xs">
          {open ? (
            <FaChevronUp />
          ) : (
            <FaChevronDown />
          )}
        </span>
      </button>

      {/* Menu */}
      {open && (
        <div className="absolute right-0 mt-10 w-40 max-w-[90vw] border border-gray-300 rounded-sm bg-white shadow-lg z-50">
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
