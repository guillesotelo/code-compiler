import React from "react";
import { classnames } from "../utils/general";

const CustomInput = ({ customInput, setCustomInput, isMobile }) => {
  return (
    <div className={`${isMobile ? 'mx-8' : 'w-full'} custom-input`}>
      <textarea
        rows="1"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Custom input`}
        style={{ width: isMobile ? '91vw' : '97%' }}
        className={`${isMobile ? 'mx-3' : 'w-full mx-4'} outline-0 bg-[#121d23] p-4 rounded-md text-white font-normal text-sm overflow-y-auto`}
      ></textarea>
    </div>
  );
};

export default CustomInput;
