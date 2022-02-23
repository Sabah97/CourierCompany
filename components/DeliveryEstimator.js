import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useQuery } from "react-query";

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

  const [showPickupDivisions, setShowPickupDivisions] = useState(true);
  const [showPickupDistricts, setShowPickupDistricts] = useState(false);
  const [showPickupUpazillas, setShowPickupUpazillas] = useState(false);

  const [showDropDivisions, setShowDropDivisions] = useState(true);
  const [showDropDistricts, setShowDropDistricts] = useState(false);
  const [showDropUpazillas, setShowDropUpazillas] = useState(false);

  const handleToggleInfo = (
    deliveryType,
    showDivisions,
    showDistricts,
    showUpazillas
  ) => {
    if (deliveryType == "pickup") {
      setShowPickupDivisions(showDivisions);
      setShowPickupDistricts(showDistricts);
      setShowPickupUpazillas(showUpazillas);
    } else if (deliveryType == "drop") {
      setShowDropDivisions(showDivisions);
      setShowDropDistricts(showDistricts);
      setShowDropUpazillas(showUpazillas);
    }
  };

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

  const handleSelectDistrict = (deliveryType, districtName) => {
    if (deliveryType == "pickup") {
      handlePopulateUpazillas("pickup", pickupDistricts, districtName);

      setSelectedPickupDistrict(districtName);
      setPickupLocation(`${pickupLocation} -> ${districtName}`);
    } else if (deliveryType == "drop") {
      handlePopulateUpazillas("drop", dropDistricts, districtName);
      setSelectedDropDistrict(districtName);
      setDropLocation(`${dropLocation} -> ${districtName}`);
    }
  };

  const handleUpdateUpazillaInLocation = (
    deliveryType,
    locationString,
    upazillaName
  ) => {
    let locationArray = locationString.split(" -> ");
    locationArray[2] = upazillaName;
    return locationArray.join(" -> ");
  };

  const handleSelectUpazilla = (deliveryType, upazillaName) => {
    if (deliveryType == "pickup") {
      setSelectedPickupUpazilla(upazillaName);

      setPickupLocation(
        handleUpdateUpazillaInLocation("pickup", pickupLocation, upazillaName)
      );
    } else if (deliveryType == "drop") {
      setSelectedDropUpazilla(upazillaName);
      setDropLocation(
        handleUpdateUpazillaInLocation("drop", dropLocation, upazillaName)
      );
    }
  };

  const renderDistrictList = (districts) => {
    districts = districts.map((district) => district.district);
    return ["⬅ Back", ...districts];
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
    <div className="container mb-12">
      <div className="flex flex-col  mt-16 items-center">
        <h1 className="text-tertiary">Delivery Estimator</h1>
      </div>
      <div className="grid  lg:grid-cols-2 mt-12">
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
          {/* <input
           
            placeholder="Select Pickup Area"
            required
          /> */}
          {!pickupLocation && divisions.length > 0 && (
            <Dropdown
              className="border border-gray-400 p-4 mt-4  w-8/12 rounded-sm placeholder-gray-400"
              options={divisions}
              onChange={({ value }) => handleSelectDivision("pickup", value)}
              placeholder="Select Pickup Area"
            />
          )}
          {selectedPickupDivision &&
            pickupDistricts.length > 1 &&
            !selectedPickupDistrict && (
              <Dropdown
                className="border border-gray-400 p-4 mt-4  w-8/12 rounded-sm placeholder-gray-400"
                options={renderDistrictList(pickupDistricts)}
                onChange={({ value }) => handleSelectDistrict("pickup", value)}
                placeholder="Select Pickup Area"
                value={pickupLocation}
              />
            )}
          {selectedPickupDistrict && pickupUpazillas.length > 1 && (
            <Dropdown
              className="border border-gray-400 p-4 mt-4  w-8/12 rounded-sm placeholder-gray-400"
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
              className="border border-gray-400 p-4 mt-4  w-8/12 rounded-sm placeholder-gray-400"
              options={divisions}
              onChange={({ value }) => handleSelectDivision("drop", value)}
              placeholder="Select Drop Area"
            />
          )}
          {selectedDropDivision &&
            dropDistricts.length > 1 &&
            !selectedDropDistrict && (
              <Dropdown
                className="border border-gray-400 p-4 mt-4  w-8/12 rounded-sm placeholder-gray-400"
                options={renderDistrictList(dropDistricts)}
                onChange={({ value }) => handleSelectDistrict("drop", value)}
                placeholder="Select Drop Area"
                value={dropLocation}
              />
            )}
          {selectedDropDistrict && dropUpazillas.length > 1 && (
            <Dropdown
              className="border border-gray-400 p-4 mt-4  w-8/12 rounded-sm placeholder-gray-400"
              options={dropUpazillas}
              onChange={({ value }) => handleSelectUpazilla("drop", value)}
              placeholder="Select Drop Area"
              value={dropLocation}
            />
          )}
        </div>
      </div>
      <div className="flex justify-center mt-48">
        <Button title="Estimate Delivery Charge" />
      </div>
    </div>
  );
}
