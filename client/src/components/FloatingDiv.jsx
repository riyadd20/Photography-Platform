import React from "react";
import './FloatingDiv.css'


const FloatinDiv = ({image, text1, text2}) => {
  return (
    // darkMode
    <div className="floatingDiv">
      <img src={image} alt="" />
      <div>
        {text1}
        <br/>
        {text2}
      </div>
    </div>
  );
};

export default FloatinDiv;