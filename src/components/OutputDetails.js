import React from "react";

const OutputDetails = ({ outputDetails }) => {
  return (
    <div className="metrics-container m-2 flex flex-col space-y-3 rounded-lg border-2 border-gray-400 p-5">
      <p className="text-sm">
        Status:{" "}
        <span className="font-semibold mx-3 px-2 py-1 rounded-md bg-gray-100 text-black">
          {outputDetails?.status?.description}
        </span>
      </p>
      <p className="text-sm">
        Memory:{" "}
        <span className="font-semibold mx-3 px-2 py-1 rounded-md bg-gray-100 text-black">
          {outputDetails?.memory} bytes
        </span>
      </p>
      <p className="text-sm">
        Time:{" "}
        <span className="font-semibold mx-3 px-2 py-1 rounded-md bg-gray-100 text-black">
          {outputDetails?.time} s
        </span>
      </p>
    </div>
  );
};

export default OutputDetails;
