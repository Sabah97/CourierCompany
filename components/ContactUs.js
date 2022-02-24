import React, { useState } from "react";
import Button from "../components/Button";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import { useAlert } from "react-alert";
import Modal from "react-modal";

const ContactUs = ({ title, img, bgColor, placeholderBg }) => {
  //   const alert = useAlert();
  return (
    <div class="pb-20 pt-2  bg-blue-100">
      <h2 class="text-center text-4xl text-tertiary font-bold mt-20">
        Contact Us
      </h2>
      <div class="grid lg:grid-cols-2 justify-items-center gap-12 mt-6 mb-20 container">
        <img class="mt-48 w-11/12" src={img} />
        <div class="flex flex-col lg:w-full mt-16 w-9/12">
          <h2 class="text-secondary font-bold leading-normal text-4xl">
            Contact us if you need any assistance
          </h2>

          <input
            placeholder="Your Name"
            class="mt-12 text-secondary placeholder-secondary border-gray-400  border px-4 py-4 rounded-lg tracking-wide font-light placeholder-bg-transparent placeholder-light"
            required
          />

          <input
            placeholder="Email"
            class="mt-12 text-secondary placeholder-secondary border-gray-400  border px-4 py-4 rounded-lg tracking-wide font-light placeholder-bg-transparent  placeholder-light"
            required
          />

          <textarea
            placeholder="Message"
            class="mt-12 text-secondary placeholder-secondary border-gray-400 border px-4 py-8 rounded-lg tracking-wide font-light placeholder-light placeholder-bg-transparent"
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
