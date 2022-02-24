import React, { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    height: "50%",
    width: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const DetailsModal = ({}) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [discountModalIsOpen, setDiscountModalIsOpen] = React.useState(false);

  const openModal = () => setIsOpen(true);

  const openDiscountModal = () => setDiscountModalIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const closeDiscountModal = () => setDiscountModalIsOpen(false);
  const afterOpenModal = () => {};

  return (
    <div>
      <p className="text-secondary text-lg text-center mb-12">
        Check our{" "}
        <span className="text-tertiary font-bold cursor-pointer">
          <button onClick={openModal}> detailed list </button>
        </span>{" "}
        and{" "}
        <span className="text-tertiary font-bold cursor-pointer">
          <button onClick={openDiscountModal}> discount code list </button>
        </span>{" "}
        for more info
      </p>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
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
        <h2 className="text-tertiary text-center mt-4 text-xl">
          Delivery Charge List
        </h2>
        <p className="text-gray-600 text-sm text-center">
          Estimate your delivery charge in each delivery
        </p>
        <div className="grid lg:grid-cols-2 justify-items-center mt-12 p-8 border border-tertiary">
          <div className="flex flex-col">
            <h2 className="text-primary text-2xl">Inside Dhaka</h2>

            <p className="text-black text-lg mt-2">
              <span className="text-tertiary font-bold">70Tk </span>- Weight
              upto 3kg
            </p>
            <p className="text-black text-lg mt-2">
              <span className="text-tertiary font-bold">100Tk </span>- Weight
              4-6kg
            </p>
            <p className="text-black text-lg mt-2">
              <span className="text-tertiary font-bold">140Tk </span>- Weight
              over 6kg
            </p>
          </div>
          <div className="flex flex-col md:mt-0 mt-4">
            <h2 className="text-primary text-2xl">Outside Dhaka</h2>

            <p className="text-black text-lg mt-2">
              <span className="text-tertiary font-bold">120Tk </span>- Weight
              upto 3kg
            </p>
            <p className="text-black text-lg mt-2">
              <span className="text-tertiary font-bold">140Tk </span>- Weight
              4-6kg
            </p>
            <p className="text-black text-lg mt-2">
              <span className="text-tertiary font-bold">180Tk </span>- Weight
              over 6kg
            </p>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={discountModalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeDiscountModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex flex-row justify-end">
          <button onClick={closeDiscountModal}>
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
        <h2 className="text-tertiary text-center mt-4 text-xl">
          Check out our discount codes!
        </h2>
        <p className="text-gray-600 text-sm text-center">
          Use our promo codes and get unbelieveable discounts!
        </p>
        <div className="mt-12 p-8 border border-tertiary">
          <div className="flex flex-col">
            <h2 className="text-primary text-2xl">Promo code</h2>

            <p className="text-black text-lg mt-2">
              1. <span className="text-tertiary font-bold">Feb21 </span>to get
              21 taka discount in 3kg+ deliveries{" "}
              <span className="text-tertiary font-bold">
                Valid till Feb'22{" "}
              </span>
            </p>
            <p className="text-black text-lg mt-2">
              2. <span className="text-tertiary font-bold">DhakarBahire </span>
              to get 30 taka discount in deliveries outside Dhaka{" "}
              <span className="text-tertiary font-bold">
                Valid till January'22{" "}
              </span>
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default DetailsModal;
