import React, { Component } from "react";
import Slider from "react-slick";
import IMG1 from "../trendingImages/holi1.jpg";
import IMG2 from "../trendingImages/womensday1.jpeg";
import IMG3 from "../trendingImages/womensday2.jpg";
import IMG4 from "../trendingImages/womensday3.jpg";
import IMG5 from "../trendingImages/womensday4.jpeg";
import IMG6 from "../trendingImages/holi2.jpg";
import IMG7 from "../trendingImages/womensday5.jpeg";
import IMG8 from "../trendingImages/holi3.jpg";
import IMG9 from "../trendingImages/womensday6.jpeg";
import "./Trending.css";

const data = [
  {
    id: 1,
    image: IMG1,
  },

  {
    id: 2,
    image: IMG2,
  },
  {
    id: 3,
    image: IMG3,
  },
  {
    id: 4,
    image: IMG4,
  },
  {
    id: 5,
    image: IMG5,
  },
  {
    id: 6,
    image: IMG6,
  },
  {
    id: 7,
    image: IMG7,
  },
  {
    id: 8,
    image: IMG8,
  },
  {
    id: 9,
    image: IMG9,
  },
];

export default function Trending() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  // const settings = {
  //     className: "center",
  //     centerMode: true,
  //     infinite: true,
  //     centerPadding: "60px",
  //     slidesToShow: 3,
  //     speed: 500
  //   };

  return (
    <div className="trending">
      <p className="trending-p"> Trending.</p>

      {/* <div><img className="im1" src={IMG1} /></div> */}
      <Slider {...settings}>
        <div>
          <h3>1</h3>
          <img className="im1" src={IMG1} />
        </div>
        <div>
          <h3>2</h3>
          <img className="im1" src={IMG2} />
        </div>
        <div>
          <h3>3</h3>
          <img className="im1" src={IMG3} />
        </div>
        <div>
          <h3>4</h3>
          <img className="im1" src={IMG4} />
        </div>
        <div>
          <h3>5</h3>
          <img className="im1" src={IMG5} />
        </div>
        <div>
          <h3>6</h3>
          <img className="im1" src={IMG6} />
        </div>
        <div>
          <h3>7</h3>
          <img className="im1" src={IMG7} />
        </div>
        <div>
          <h3>8</h3>
          <img className="im1" src={IMG8} />
        </div>
        <div>
          <h3>9</h3>
          <img className="im1" src={IMG9} />
        </div>
      </Slider>
    </div>
  );
}
