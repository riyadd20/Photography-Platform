import React from "react";
import IMG1 from "../../images/courses1.jpg";
import IMG2 from "../../images/courses2.jpg";
import IMG3 from "../../images/courses3.jpg";
import IMG4 from "../../images/courses4.png";
import IMG5 from "../../images/courses5.jpg";

import "./Section.css";

const data = [
  {
    id: 1,
    image: IMG1,
    title: "Sports & Action Photography Know Hows",
    date: "STANDARD",
    description:
      "Learn all the essentials of photography, and develop your skills to become an ultimate photographer yourself.",
    flexDirection: "row",
  },

  {
    id: 2,
    image: IMG2,
    title: "DSLR vs. Mirrorless|The Future Of Photography",
    date: "PREMIUM",
    description:
      "One of the most common phrases in photography circles these days is that “mirrorless is the future.” Explore the truth of this statement.",
    flexDirection: "row-reverse",
  },
  {
    id: 3,
    image: IMG3,
    title: "Send In The Drones: How UAV Photography Is Changing Filmmaking",
    date: "PREMIUM",
    description:
      "Drones are becoming invaluable tools that make the creative process quicker and cheaper. The best MasterClass for Drone Photography.",
    flexDirection: "row",
  },
  {
    id: 4,
    image: IMG4,
    title: "Photography - The Ultimate Guide to Using Off-Camera Flash",
    date: "STANDARD",
    description:
      "Follow me on 19 photo sessions & learn to create beautiful light using small flashes & take stunning dramatic portraits.",
    flexDirection: "row-reverse",
  },
  {
    id: 5,
    image: IMG5,
    title: "The Ultimate Photography Course For Beginners",
    date: "STANDARD",
    description:
      "Learn all the essentials of photography, and develop your skills to become an ultimate photographer yourself.",
    flexDirection: "row",
  },
];

const section = () => {
  return (
    <div>
      {data.map(({ id, image, title, date, description, flexDirection }) => {
        return (
          <div key={id} className="section" style={{ flexDirection }}>
            <div className="left-container">
              <div className="block1">
                <img src={image} />
              </div>
            </div>
            <div className="right-container section-block">
              <div className="sec-container">
                <h2>
                  <b>{title}</b>
                </h2>
                <h3>{date}</h3>
                <h4>{description}</h4>
                <button className="button-13">Book Now</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default section;
