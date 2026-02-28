import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

const ProfileDrawer = ({ isOpen, setIsOpen, children, userInfo }) => {
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
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 md:w-1/2 bg-white shadow-lg z-50 
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "translate-x-full"} lg:hidden`}
      >
        <div className="" onClick={() => setIsOpen(false)}>
          <div className="bg-techmart-dark h-28 flex flex-col justify-between p-2 border-2 border-white">
            <button
              onClick={() => setIsOpen(false)}
              className="border w-fit rounded-2xl border-white"
            >
              <RxCross2 className="size-7 text-white" />
            </button>
            <h2 className="text-white font-Semibold text-2xl">
              Hello, {userInfo?.name.trim().split(/\s+/)[0]}
            </h2>
          </div>

          {children}
        </div>
      </div>
    </>
  );
};

export default ProfileDrawer;
