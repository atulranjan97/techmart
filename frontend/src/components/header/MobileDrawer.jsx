import { useState, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";

const MobileDrawer = ({isOpen, setIsOpen, children }) => {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* Menu Button (Mobile Only) */}
      {/* <button onClick={() => setIsOpen(true)} className="lg:hidden text-white">
        <HiMenu className="size-8" />
      </button> */}

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 bg-white shadow-lg z-50 
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:hidden`}
      >
        <div className="p-4" onClick={() => setIsOpen(false)}>
          <button
            onClick={() => setIsOpen(false)}
            className="mb-4 text-gray-600 border"
          >
            <RxCross2 className="size-7" />
          </button>

          {children}
        </div>
      </div>
    </>
  );
};

export default MobileDrawer;
