import React from "react";

const OutputDetails = ({ outputDetails }) => {
  return (
    <div className="metrics-container mx-5 my-2 flex flex-col space-y-3 rounded-lg border-2 border-gray-400 p-5">
      <p className="text-m">
        Status:{" "}
        <span className="font-semibold mx-3 px-2 py-1 rounded-md bg-gray-100 text-black">
          {outputDetails?.status?.description}
        </span>
      </p>
      <p className="text-m">
        Memory:{" "}
        <span className="font-semibold mx-3 px-2 py-1 rounded-md bg-gray-100 text-black">
          {outputDetails?.memory} bytes
        </span>
      </p>
      <p className="text-m">
        Time:{" "}
        <span className="font-semibold mx-3 px-2 py-1 rounded-md bg-gray-100 text-black">
          {outputDetails?.time} s
        </span>
      </p>
    </div>
  );
};

export default OutputDetails;
