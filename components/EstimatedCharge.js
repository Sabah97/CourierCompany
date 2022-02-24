import React, { useState, useEffect } from "react";
const discountCodes = [
  {
    code: "feb21",
    expiryDate: new Date("February 28, 2022"),
    minWeight: 3,
    division: "",
    discountValue: 21,
  },
  {
    code: "dhakarbahire",
    expiryDate: new Date("January 31, 2022"),
    minWeight: 0,
    division: "Dhaka",
    discountValue: 30,
  },
];
export default function EstimatedCharge({
  price,
  weight,
  pickupLocation,
  dropLocation,
}) {
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [inputDiscountCode, setInputDiscountCode] = useState("");
  const [discountValue, setDiscountValue] = useState(0);
  const [warningMessage, setWarningMessage] = useState("");

  const handleSubmitCode = (e) => {
    e.preventDefault();
    let lowerCasedInputDiscountCode = inputDiscountCode.toLowerCase();

    let foundDiscount = discountCodes.find(
      (code) => code.code == lowerCasedInputDiscountCode
    );
    if (!foundDiscount) {
      setWarningMessage("This discount code does not exist...");
      setDiscountValue(0);
    } else if (foundDiscount) {
      let today = new Date();
      if (today > foundDiscount.expiryDate) {
        setWarningMessage("This discount code has expired...");
        setDiscountValue(0);
      } else if (parseInt(weight) < foundDiscount.minWeight) {
        setWarningMessage(
          `Please add minimum weight of ${foundDiscount.minWeight}kg to enjoy this discount`
        );
        setDiscountValue(0);
      } else {
        setDiscountValue(foundDiscount.discountValue);
      }
    }
  };

  useEffect(() => {
    if (dropLocation) {
      let locationArray = dropLocation.split(" -> ");
      let divisionName = locationArray[0];
      if (divisionName == "Dhaka") {
        if (weight > 0 && weight <= 3) {
          setDeliveryCharge(70);
        } else if (weight > 3 && weight <= 6) {
          setDeliveryCharge(100);
        } else if (weight > 6) {
          setDeliveryCharge(140);
        }
      } else if (divisionName !== "Dhaka") {
        if (weight > 0 && weight <= 3) {
          setDeliveryCharge(120);
        } else if (weight > 3 && weight <= 6) {
          setDeliveryCharge(140);
        } else if (weight > 6) {
          setDeliveryCharge(180);
        }
      }
    }
  }, [dropLocation]);

  return (
    <div className="container border border-tertiary rounded-sm mt-12  mb-12 ">
      <div className="grid lg:grid-cols-2  ">
        <div className="flex flex-col px-16 py-6">
          <p className="text-medium text-tertiary font-medium text-2xl">
            Product Weight
          </p>
          <p className="text-xl mt-2 text-secondary text-lg">{`${weight}kg`}</p>
          <p className="text-medium text-tertiary mt-6 font-medium text-2xl">
            Product Price
          </p>
          <p className="text-xl mt-2 text-secondary text-lg">{`${price}Tk`}</p>
          <p className="text-medium text-tertiary mt-6 font-medium text-2xl">
            Pickup Area
          </p>
          <p className="text-xl mt-2 text-secondary text-lg">
            {pickupLocation}
          </p>
          <p className="text-medium text-tertiary mt-6 font-medium text-2xl">
            Delivery Area
          </p>
          <p className="text-xl mt-2 text-secondary text-lg">{dropLocation}</p>
          <form onSubmit={handleSubmitCode} className="flex mt-8">
            <input
              type="text"
              value={inputDiscountCode}
              onChange={({ target }) => {
                setWarningMessage("");
                setInputDiscountCode(target.value);
              }}
            />{" "}
            <button
              className="ml-6 font-bold text-tertiary text-xl"
              type="submit"
            >
              Add Code
            </button>
          </form>
        </div>
        <div className="flex flex-col px-16 py-6 bg-blue-100">
          <h2 className="text-secondary font-bold mt-12"> Total Price</h2>

          {discountValue == 0 ? (
            <p className="text-primary font-bold mt-4 text-2xl">
              {`Tk: ${parseInt(price) + parseInt(deliveryCharge)}`}
            </p>
          ) : (
            <p className="text-primary font-bold mt-4 text-2xl">
              Tk: <strike>{parseInt(price) + parseInt(deliveryCharge)}</strike>{" "}
              <span>
                {parseInt(price) + parseInt(deliveryCharge) - discountValue}
              </span>
            </p>
          )}
          <p className="text-secondary text-lg  mt-8">Charges Include:</p>
          <p className="text-secondary font-medium mt-4 text-lg">
            {" "}
            {`Product Price: ${price}Tk`}
          </p>
          {discountValue == 0 ? (
            <p className="text-secondary font-medium mt-2 text-lg">{`Delivery Charge: ${deliveryCharge}Tk`}</p>
          ) : (
            <p className="text-secondary font-medium mt-2 text-lg">
              Delivery Charge: <strike>{deliveryCharge}</strike>
              <span> {deliveryCharge - discountValue}</span>
              Tk
            </p>
          )}
        </div>
      </div>
      {warningMessage && (
        <p
          className="flex justify-center mt-8 mb-0"
          style={{ color: "red", fontSize: 24, marginBottom: 10 }}
        >
          {warningMessage}
        </p>
      )}
    </div>
  );
}
