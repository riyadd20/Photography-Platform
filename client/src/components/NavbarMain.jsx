import React from "react";
import "./NavbarMain.css"
import { useNavigate } from 'react-router-dom'
const NavbarMain = () => {
  const navigate = useNavigate()
  return (
    <div className="n-wrapper">
        <div className="n-left">
        <div className="n-logo">LensLyfe</div>
        </div>
        <div className="n-right">
            <button className="button-56" onClick={() => navigate('/login') }>
                Login
            </button>
            <button style={{marginLeft:10}} className="button-56" onClick={() => navigate('/signup')}>
                Sign Up
            </button>
        </div>
    </div>
  );
};

export default NavbarMain;
