import { useState, useRef, useEffect } from "react";

export default function CustomSelect({
  options = [],
  value,
  onChange,
  placeholder = "Select...",
  visibleOptions = 5, // control how many options are visible before scroll
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || placeholder;

  return (
    <div className={`relative w-20 ${className}`} ref={dropdownRef}>
      
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full border rounded-md px-3 py-1 bg-white text-left flex items-center justify-between shadow-sm hover:border-gray-400 focus:outline-none"
      >
        <span className="truncate">{selectedLabel}</span>

        {/* Arrow */}
        <span
          className={`ml-2 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <ul
          className="absolute z-50 mt-1 w-full bg-white border rounded-md shadow-lg overflow-y-auto"
          style={{
            maxHeight: `${visibleOptions * 40}px`, // each option ~40px
          }}
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`px-3 py-1 cursor-pointer hover:bg-gray-100 ${
                value === option.value ? "bg-gray-200 font-medium" : ""
              }`}
            >
              {option.label}
            </li>   
          ))}
        </ul>
      )}
    </div>
  );
}
