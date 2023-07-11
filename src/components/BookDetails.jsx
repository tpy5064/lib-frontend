import React from "react";
import { ImCross } from "react-icons/im";
import { useRef } from "react";

const BookDetails = ({
  title,
  author,
  publisher,
  cover,
  details,
  handleClose,
}) => {
  return (
    <div
      className="w-[850px] h-[800px] bg-dark-secondary rounded-lg shadow-xl flex flex-col justify-start 
    items-start fixed z-50 -translate-x-[50%] -translate-y-[50%] top-[50%] left-[50%] p-8"
    >
      <div className="flex justify-start items-start w-full">
        <h1 className=" text-4xl text-white ">{title}</h1>
        <button
          className=" ml-auto"
          onClick={() => {
            handleClose();
          }}
        >
          <ImCross />
        </button>
      </div>

      <h1 className="text-3xl text-white mt-2">{author}</h1>
      <h1 className="text-2xl text-white mt-2">{publisher}</h1>
      <img src={cover} alt="" />
      <p>{details}</p>
    </div>
  );
};

export default BookDetails;
