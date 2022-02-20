import React from "react";

export default function EstimatedCharge() {
  return (
    <div className="container border border-tertiary rounded-sm mt-12  mb-12 ">
      <div className="grid grid-cols-2 ">
        <div className="flex flex-col px-16 py-6">
          <p className="text-medium text-tertiary font-medium text-2xl">
            Product Weight
          </p>
          <p className="text-xl mt-2 text-secondary text-lg">4kg</p>
          <p className="text-medium text-tertiary mt-6 font-medium text-2xl">
            Product Price
          </p>
          <p className="text-xl mt-2 text-secondary text-lg">200Tk</p>
          <p className="text-medium text-tertiary mt-6 font-medium text-2xl">
            Pickup Area
          </p>
          <p className="text-xl mt-2 text-secondary text-lg">
            Dhaka, Dhaka, Wari
          </p>
          <p className="text-medium text-tertiary mt-6 font-medium text-2xl">
            Delivery Area
          </p>
          <p className="text-xl mt-2 text-secondary text-lg">
            Chittagong, Bandarban, Station Road
          </p>
        </div>
        <div className="flex flex-col px-16 py-6 bg-blue-200">
          <h2 className="text-secondary font-bold mt-12"> Total Price</h2>
          <p className="text-primary font-bold mt-4 text-2xl"> Tk- 350</p>
          <p className="text-secondary text-lg  mt-8">Charges Include:</p>
          <p className="text-primary font-medium mt-4 text-lg">
            {" "}
            Product Price - 200 Tk
          </p>
          <p className="text-primary font-medium mt-2 text-lg">
            {" "}
            Delivery Charge- 150 Tk
          </p>
        </div>
      </div>
    </div>
  );
}
