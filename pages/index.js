import Head from "next/head";
import Image from "next/image";
import LandingPage from "../components/LandingPage";
import Navbar from "../components/Navbar";
import DeliveryEstimator from "../components/DeliveryEstimator";
import EstimatedCharge from "../components/EstimatedCharge";
import DetailsModal from "../components/DetailsModal";

export default function Home() {
  return (
    <div className="w-full ">
      <Navbar />
      <LandingPage />
      <DeliveryEstimator />
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
            stroke-width="1"
          />
        </svg>
      </div>
      <EstimatedCharge />
      <p className="text-secondary text-lg text-center mb-12">
        Check our{" "}
        <span className="text-tertiary font-bold cursor-pointer">
          detailed list
        </span>{" "}
        for more info
      </p>
      <DetailsModal />
    </div>
  );
}
