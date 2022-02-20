import React from "react";
import Button from "../components/Button";
export default function DeliveryEstimator() {
  return (
    <div className="container mb-12">
      <div className="flex flex-col  mt-16 items-center">
        <h1 className="text-tertiary">Delivery Estimator</h1>
        <svg
          className="mt-4"
          width="538"
          height="4"
          viewBox="0 0 538 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="0.865234"
            y1="2"
            x2="537.135"
            y2="2"
            stroke="#0047FF"
            stroke-width="1"
          />
        </svg>
      </div>
      <div className="grid grid-cols-2 mt-12">
        <div className="">
          <p className="text-secondary font-medium text-xl text-start">
            Weight
          </p>
          <input
            className="border border-gray-400 p-4 mt-4 w-8/12  rounded-sm placeholder-gray-400"
            placeholder="Enter Weight"
            required
          />
        </div>
        <div className=" ">
          <p className="text-secondary font-medium  text-xl text-left">Price</p>
          <input
            className="border border-gray-400 p-4 mt-4  w-8/12 rounded-sm placeholder-gray-400"
            placeholder="Enter Price"
            required
          />
        </div>
        <div className="flex flex-col">
          <p className="text-secondary font-medium mt-6 text-xl text-left">
            Pickup Area
          </p>
          <input
            className="border border-gray-400 p-4 mt-4  w-8/12 rounded-sm placeholder-gray-400"
            placeholder="Select Pickup Area"
            required
          />
        </div>
        <div className="flex flex-col ">
          <p className="text-secondary font-medium mt-6 text-xl text-left">
            Delivery Area
          </p>
          <input
            className="border border-gray-400 p-4 mt-4  w-8/12 rounded-sm placeholder-gray-400"
            placeholder="Select Delivery Area"
            required
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button title="Estimate Delivery Charge" />
      </div>
    </div>
  );
}
