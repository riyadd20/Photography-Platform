import React from "react";
// import { Circles } from "react-loader-spinner";
import { MagnifyingGlass } from "react-loader-spinner";

function Spinner({ message }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      {/* <Circles
        color="#00BFFF"
        height={50}
        r={200}
        className="m-5"
      /> */}

      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
}

export default Spinner;
