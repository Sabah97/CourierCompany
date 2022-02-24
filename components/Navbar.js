import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [toggled, setToggled] = useState(false);
  const buttonClass = toggled ? "toggled" : "";

  return (
    <div className="sticky z-10 lg:prose-lg top-0 flex items-center bg-white justify-around p-6  ">
      <div className="w-full flex-grow flex sm:items-center sm:w-auto  justify-between">
        <div className="flex flex-row justify-start">
          <Link href="/">
            <img className="w-9/12" src="/logo1.png" />
          </Link>
        </div>
        <div className="outline-none select-none buttonClass">
          <button
            className="outline-none select-none justify-between text-purple-100 inline-flex p-3  rounded lg:hidden "
            id="menu-toggled"
            onClick={() => setToggled((toggle) => !toggle)}
          >
            <svg
              width="30"
              height="46"
              viewBox="0 0 50 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line y1="43" x2="50" y2="43" stroke="#000000" strokeWidth="6" />

              <line y1="23" x2="50" y2="23" stroke="#0047FF" strokeWidth="6" />
              <line y1="3" x2="50" y2="3" stroke="#000000" strokeWidth="6" />
            </svg>
          </button>
        </div>
        <div
          className={
            toggled
              ? " top-nav lg:inline-flex lg:flex-grow lg:w-auto fixed w-3/4 top-0 left-0 h-full bg-white py-3 z-30 "
              : "hidden top-nav w-full lg:inline-flex lg:flex-grow lg:w-auto"
          }
          id="navigation"
        >
          <div
            id="navbar-sm"
            className=" grid lg:grid-cols-2 px-4 lg:gap-12 items-center lg:ml-auto "
          >
            <Link href="/">
              <p className="text-secondary text-lg font-bold pt-2">Home</p>
            </Link>

            <Link href="/">
              <p className="text-secondary text-lg font-bold pt-2">Service</p>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={
          toggled ? "w-full h-full bg-black opacity-50 fixed top-0 left-0" : ""
        }
        onClick={() => setToggled((toggle) => !toggle)}
      ></div>
    </div>
  );
}
