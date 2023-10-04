import React from "react";
import { classnames } from "../utils/general";

const CustomInput = ({ customInput, setCustomInput, isMobile }) => {
  return (
    <div className={`${isMobile ? '' : 'w-full'} custom-input`}>
      <textarea
        rows="5"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Custom input`}
        className={`${isMobile ? 'w-full' : 'w-full mx-4'} outline-0 bg-[#121d23] p-4 rounded-md text-white font-normal text-sm overflow-y-auto`}
      ></textarea>
    </div>
  );
};

export default CustomInput;
