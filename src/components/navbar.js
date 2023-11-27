import React from "react";
import { ReactComponent as Logo } from "../assets/photos-brand-svgrepo-com.svg";

export function Navbar() {
  return (
    <>
      <div
        className=" bg-black fixed top-0 w-full text-white flex items-center px-5 py-3 h-20"
        style={{
          backgroundImage: "linear-gradient(to right, #38B2AC, #4299E1)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 0.4rem",
          backgroundPosition: "bottom",
          textShadow: "0 0 10px #38B2AC, 0 0 20px #38B2AC, 0 0 30px #38B2AC, 0 0 40px #4299E1",
        }}
      >
        <a href="/" className="flex">
          <Logo className="w-12 h-12" />
          <span className="ml-4 text-4xl">PhotoFolio</span>
        </a>
      </div>
      {/* <hr className="border-none bg-gradient-to-r from-green-400 to-blue-500 h-1"  /> */}
    </>
  );
}
