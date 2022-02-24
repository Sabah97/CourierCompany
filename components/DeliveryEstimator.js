import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import EstimatedCharge from "./EstimatedCharge";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    marginTop: "5%",
    marginBottom: "15%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
export default function DeliveryEstimator() {
  const [pickupDistricts, setPickupDistricts] = useState([{ value: "⬅ Back" }]);
  const [dropDistricts, setDropDistricts] = useState([{ value: "⬅ Back" }]);
  const [pickupUpazillas, setPickupUpazillas] = useState([{ value: "⬅ Back" }]);
  const [dropUpazillas, setDropUpazillas] = useState([{ value: "⬅ Back" }]);

  const [divisions, setDivisions] = useState([]);

  const [selectedPickupDivision, setSelectedPickupDivision] = useState("");
  const [selectedPickupDistrict, setSelectedPickupDistrict] = useState("");
  const [selectedPickupUpazilla, setSelectedPickupUpazilla] = useState("");

  const [selectedDropDivision, setSelectedDropDivision] = useState("");
  const [selectedDropDistrict, setSelectedDropDistrict] = useState("");
  const [selectedDropUpazilla, setSelectedDropUpazilla] = useState("");

  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [weight, setWeight] = useState(0);
  const [price, setPrice] = useState(0);

  const [showEstimator, setShowEstimator] = useState(false);

  const closeModal = () => setShowEstimator(false);
  const [warningMessage, setWarningMessage] = useState("");

  const handleSelectDivision = (deliveryType, divisionName) => {
    if (deliveryType == "pickup") {
      setSelectedPickupDivision(divisionName);
      setPickupLocation(pickupLocation + divisionName);
      fetchDistricts("pickup", divisionName);
    } else if (deliveryType == "drop") {
      setSelectedDropDivision(divisionName);
      setDropLocation(dropLocation + divisionName);
      fetchDistricts("drop", divisionName);
    }
  };

  const handlePopulateUpazillas = (deliveryType, districts, districtName) => {
    let upazillas = districts.find(
      (district) => district.district == districtName
    );
    upazillas = upazillas.upazilla;
    if (deliveryType == "pickup") {
      setPickupUpazillas(["⬅ Back", ...upazillas]);
    } else if (deliveryType == "drop") {
      setDropUpazillas(["⬅ Back", ...upazillas]);
    }
  };

  const backFromDistrict = (deliveryType) => {
    if (deliveryType == "pickup") {
      setSelectedPickupDistrict("");
      setPickupLocation("");
      setSelectedPickupDivision("");
    } else if (deliveryType == "drop") {
      setSelectedDropDistrict("");
      setDropLocation("");
      setSelectedDropDivision("");
    }
  };

  const handleSelectDistrict = (deliveryType, districtName) => {
    if (districtName == "⬅ Back") {
      return backFromDistrict(deliveryType);
    } else if (deliveryType == "pickup") {
      handlePopulateUpazillas("pickup", pickupDistricts, districtName);

      setSelectedPickupDistrict(districtName);
      setPickupLocation(`${pickupLocation} -> ${districtName}`);
    } else if (deliveryType == "drop") {
      handlePopulateUpazillas("drop", dropDistricts, districtName);
      setSelectedDropDistrict(districtName);
      setDropLocation(`${dropLocation} -> ${districtName}`);
    }
  };

  const handleUpdateUpazillaInLocation = (locationString, upazillaName) => {
    let locationArray = locationString.split(" -> ");
    locationArray[2] = upazillaName;
    return locationArray.join(" -> ");
  };

  const backFromUpazilla = (deliveryType) => {
    if (deliveryType == "pickup") {
      setSelectedPickupDistrict("");
      setSelectedPickupUpazilla("");
      setPickupLocation(selectedPickupDivision);
    } else if (deliveryType == "drop") {
      setSelectedDropDistrict("");
      setSelectedDropUpazilla("");
      setDropLocation(selectedDropDivision);
    }
  };

  const handleSelectUpazilla = (deliveryType, upazillaName) => {
    if (upazillaName == "⬅ Back") {
      return backFromUpazilla(deliveryType);
    } else if (deliveryType == "pickup") {
      setSelectedPickupUpazilla(upazillaName);

      setPickupLocation(
        handleUpdateUpazillaInLocation(pickupLocation, upazillaName)
      );
    } else if (deliveryType == "drop") {
      setSelectedDropUpazilla(upazillaName);
      setDropLocation(
        handleUpdateUpazillaInLocation(dropLocation, upazillaName)
      );
    }
  };

  const renderDistrictList = (districts) => {
    districts = districts.map((district) => district.district);
    return ["⬅ Back", ...districts];
  };

  const handleShowEstimator = () => {
    let pickupLocationArray = pickupLocation.split(" -> ");
    let dropLocationArray = dropLocation.split(" -> ");
    if (!weight || weight == 0) {
      setWarningMessage("Please input product weight");
    } else if (!price || price == 0) {
      setWarningMessage("Please input a price for the product");
    } else if (pickupLocationArray.length != 3) {
      setWarningMessage("Please fill up Pickup Area");
    } else if (dropLocationArray.length != 3) {
      setWarningMessage("Please fill up Delivery Area");
    } else {
      setWarningMessage("");
      setShowEstimator(true);
    }
  };

  const fetchDivisions = () => {
    fetch("https://bdapis.herokuapp.com/api/v1.1/divisions")
      .then((res) => res.json())
      .then((res) => {
        if (res.status.code !== 200) {
          throw `Some thing went wrong`;
        } else {
          let divisions = res.data.map((division) => division.division);
          setDivisions(divisions);
        }
      })
      .catch((error) => console.error("fetchDivisions -> error", error));
  };

  const fetchDistricts = (deliveryType, divisionName) => {
    fetch(`https://bdapis.herokuapp.com/api/v1.1/division/${divisionName}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status.code !== 200) {
          throw `Some thing went wrong`;
        } else {
          let divisions = res.data.map((division) => division.division);
          if (deliveryType == "pickup") {
            setPickupDistricts(res.data);
          } else if (deliveryType == "drop") {
            setDropDistricts(res.data);
          }
        }
      })
      .catch((error) => console.error("fetchDistricts -> error", error));
  };

  useEffect(() => {
    fetchDivisions();
  }, []);

  return (
    <>
      <div className="container mb-12">
        <div className="flex flex-col  mt-16 items-center">
          <h1 className="text-tertiary">Delivery Estimator</h1>
        </div>
        <div className="grid  lg:grid-cols-2 mt-12">
          <div className="">
            <p className="text-secondary font-medium text-xl text-start">
              Weight (kg)
            </p>
            <input
              className="border border-gray-400 p-4 mt-4 w-8/12  rounded-sm placeholder-gray-400"
              placeholder="Enter Weight"
              required
              type={"number"}
              min={0}
              max={10}
              value={weight}
              onChange={({ target }) => setWeight(target.value)}
            />
          </div>
          <div className=" ">
            <p className="text-secondary font-medium  text-xl text-left">
              Selling Price
            </p>
            <input
              className="border border-gray-400 p-4 mt-4  w-8/12 rounded-sm placeholder-gray-400"
              placeholder="Enter Selling Price"
              required
              type={"number"}
              min={0}
              value={price}
              onChange={({ target }) => setPrice(target.value)}
            />
          </div>
          <div className="flex flex-col">
            <p className="text-secondary font-medium mt-6 text-xl text-left">
              Pickup Area
            </p>
            {/* <input
           
            placeholder="Select Pickup Area"
            required
          /> */}
            {!pickupLocation && divisions.length > 0 && (
              <Dropdown
                className="border border-gray-400  mt-4  w-8/12 rounded-sm placeholder-gray-400"
                options={divisions}
                onChange={({ value }) => handleSelectDivision("pickup", value)}
                placeholder="Select Pickup Area"
              />
            )}
            {selectedPickupDivision &&
              pickupDistricts.length > 1 &&
              !selectedPickupDistrict && (
                <Dropdown
                  className="border border-gray-400 mt-4  w-8/12 rounded-sm placeholder-gray-400"
                  options={renderDistrictList(pickupDistricts)}
                  onChange={({ value }) =>
                    handleSelectDistrict("pickup", value)
                  }
                  placeholder="Select Pickup Area"
                  value={pickupLocation}
                />
              )}
            {selectedPickupDistrict && pickupUpazillas.length > 1 && (
              <Dropdown
                className="border border-gray-400 mt-4  w-8/12 rounded-sm placeholder-gray-400"
                options={pickupUpazillas}
                onChange={({ value }) => handleSelectUpazilla("pickup", value)}
                placeholder="Select Pickup Area"
                value={pickupLocation}
              />
            )}
          </div>
          <div className="flex flex-col ">
            <p className="text-secondary font-medium mt-6 text-xl text-left">
              Delivery Area
            </p>
            {!dropLocation && divisions.length > 0 && (
              <Dropdown
                className="border border-gray-400  mt-4  w-8/12 rounded-sm placeholder-gray-400"
                options={divisions}
                onChange={({ value }) => handleSelectDivision("drop", value)}
                placeholder="Select Drop Area"
              />
            )}
            {selectedDropDivision &&
              dropDistricts.length > 1 &&
              !selectedDropDistrict && (
                <Dropdown
                  className="border border-gray-400  mt-4  w-8/12 rounded-sm placeholder-gray-400"
                  options={renderDistrictList(dropDistricts)}
                  onChange={({ value }) => handleSelectDistrict("drop", value)}
                  placeholder="Select Drop Area"
                  value={dropLocation}
                />
              )}
            {selectedDropDistrict && dropUpazillas.length > 1 && (
              <Dropdown
                className="border border-gray-400  mt-4  w-8/12 rounded-sm placeholder-gray-400"
                options={dropUpazillas}
                onChange={({ value }) => handleSelectUpazilla("drop", value)}
                placeholder="Select Drop Area"
                value={dropLocation}
              />
            )}
          </div>
        </div>
        {warningMessage && (
          <p
            className="flex justify-center mt-10 mb-0"
            style={{ color: "red", fontSize: 24, marginBottom: -60 }}
          >
            {warningMessage}
          </p>
        )}
        <div
          onClick={handleShowEstimator}
          className="flex justify-center mt-32"
        >
          <Button title="Estimate Delivery Charge" />
        </div>
      </div>
      <Modal
        style={customStyles}
        Modal
        isOpen={showEstimator}
        onRequestClose={() => setShowEstimator(false)}
      >
        <div className="flex flex-row justify-end">
          <button onClick={closeModal}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.657 7.071L0 1.414L1.414 0L7.071 5.657L12.728 0L14.142 1.414L8.485 7.071L14.142 12.728L12.728 14.142L7.071 8.485L1.414 14.142L0 12.728L5.657 7.071Z"
                fill="#D10019"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-tertiary text-center"> Estimated Charge</h1>
          <svg
            className="mt-4 "
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
              strokeWidth="1"
            />
          </svg>
        </div>
        <EstimatedCharge
          price={price}
          weight={weight}
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
        ></EstimatedCharge>
      </Modal>
    </>
  );
}
