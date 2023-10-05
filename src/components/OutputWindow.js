import React from "react";

const OutputWindow = ({ outputDetails, isMobile }) => {
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <pre className="px-2 py-1 font-normal text-m text-red-500">
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className="px-2 py-1 font-normal text-m text-green-500">
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre className="px-2 py-1 font-normal text-m text-red-500">
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      return (
        <pre className="px-2 py-1 font-normal text-m text-red-500">
          {atob(outputDetails?.stderr)}
        </pre>
      );
    }
  };
  return (
    <div className="output" style={{ width: isMobile ? '92vw' : '', margin: isMobile ? '.5rem auto' : '' }}>
      <h1 className="font-bold text-xl bg-clip-text bg-gradient-to-r my-2">
        Output
      </h1>
      <div className={`${isMobile ? '' : 'w-full'} h-56 bg-[#121d23] p-4 rounded-md text-white font-normal text-m overflow-y-auto`}>
        {outputDetails ? <>{getOutput()}</> : null}
      </div>
    </div>
  );
};

export default OutputWindow;
