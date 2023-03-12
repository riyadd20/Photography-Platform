import React, { useContext } from "react";
import NavbarMain from "./NavbarMain.jsx";
import "./Main.css";
import Vector1 from "../images/Vector1.png";
import Vector2 from "../images/Vector2.png";
// import boy from "../../image/boy.png";
// import glassesimoji from "../../image/glassesimoji.png";
import thumbup from "../images/thumbup.jpg";
import crown from "../images/crown.jpg";
import FloatinDiv from "./FloatingDiv";
import Services from "./Services";
// import { themeContext } from "../../Context";
import { motion } from "framer-motion";
import { Link } from "react-scroll";

// Transition
const transition = { duration: 2, type: "spring" };

const Main = () => {
  return (
    <div>
    <NavbarMain />
  <div className="main">
    
    {/* left name side */}
    <div className="i-left">
        <div className="i-name">
          {/* yahan change hy darkmode ka */}
          <span>Hy, there</span>
          <span>LensLyfe</span>
          <span>Excellence in photography.</span>
        </div>
        <Link to="contact" smooth={true} spy={true}>
          <button className="button i-button">Browse</button>
        </Link>
      </div>
      {/* right image side */}
      <div className="i-right">
        <img src={Vector1} alt="" />
        <img src={Vector2} alt="" />
        {/* <image src={boy} alt="" /> */}
        {/* animation */}
        <motion.image
          initial={{ left: "-36%" }}
          whileInView={{ left: "-24%" }}
          transition={transition}
        //   src={glassesimoji}
          alt=""
        />
        <motion.div
          initial={{ top: "-4%", left: "74%" }}
          whileInView={{ left: "68%" }}
          transition={transition}
          className="floating-div"
        >
          <FloatinDiv image={crown} text1="Web" text2="Developer" /> 
        </motion.div>

        {/* animation */}
        <motion.div
          initial={{ left: "9rem", top: "18rem" }}
          whileInView={{ left: "0rem" }}
          transition={transition}
          className="floating-div"
        >
          {/* floatinDiv mein change hy dark mode ka */}
          <FloatinDiv image={thumbup} text1="Best Design" text2="Award" /> 
        </motion.div>

        <div className="blur" style={{ background: "rgb(238 210 255)" }}></div>
        <div
          className="blur"
          style={{
            background: "#C1F5FF",
            top: "17rem",
            width: "21rem",
            height: "11rem",
            left: "-9rem",
          }}
        ></div>
      </div>
  </div>
  <Services/>
  </div>
  )
}

export default Main;


