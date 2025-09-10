import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { Navbar, Feed, PinDetail, CreatePin, Search } from "../components";

const Pins = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user && user}
        />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed path={`recommendations?id=${user._id}`}/>} />
          <Route path="/category/:categoryId" element={<Feed path={"category"}/>} />
          <Route
            path="/pin-detail/:pinId"
            element={<PinDetail user={user && user} />}
          />
          {/* <Route
            path="/create-pin"
            element={<CreatePin user={user && user} />}
          /> */}
          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;
