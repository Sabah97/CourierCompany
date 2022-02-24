import React, { useState } from "react";
import Button from "../components/Button";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import { useAlert } from "react-alert";
import Modal from "react-modal";

const ContactUs = ({ title, img, bgColor, placeholderBg }) => {
  //   const alert = useAlert();
  return (
    <div className="pb-20 pt-2  bg-blue-100">
      <h2 className="text-center text-4xl text-tertiary font-bold mt-20">
        Contact Us
      </h2>
      <div className="grid lg:grid-cols-2 justify-items-center gap-12 mt-6 mb-20 container">
        {/* <Image className="mt-48 w-11/12" src={img} /> */}
        <div className="flex flex-col lg:w-full mt-16 w-9/12">
          <h2 className="text-secondary font-bold leading-normal text-4xl">
            Contact us if you need any assistance
          </h2>

          <input
            placeholder="Your Name"
            className="mt-12 text-secondary placeholder-secondary border-gray-400  border px-4 py-4 rounded-lg tracking-wide font-light placeholder-bg-transparent placeholder-light"
            required
          />

          <input
            placeholder="Email"
            className="mt-12 text-secondary placeholder-secondary border-gray-400  border px-4 py-4 rounded-lg tracking-wide font-light placeholder-bg-transparent  placeholder-light"
            required
          />

          <textarea
            placeholder="Message"
            className="mt-12 text-secondary placeholder-secondary border-gray-400 border px-4 py-8 rounded-lg tracking-wide font-light placeholder-light placeholder-bg-transparent"
            required
          />
          {/* <button
            onClick={() => {
              alert.show("Oh look, an alert!");
            }}
          > */}
          <Button title="Submit" />
          {/* </button> */}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
