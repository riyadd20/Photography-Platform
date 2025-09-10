import React from "react";

import "./Courses.css";
import Section from "./Section/Section";
import SmoothScroll from "./SmoothScroll/SmoothScroll";

const Courses = () => {
  return (
    <>
      <SmoothScroll>
        <div className="events-body">
          {/* <Nav /> */}
          <h1 className="courses-h1">COURSES</h1>
          <Section />
        </div>
      </SmoothScroll> 
    </>
  );
};

export default Courses;
