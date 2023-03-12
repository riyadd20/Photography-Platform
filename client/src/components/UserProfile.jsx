import React, { useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// import { GoogleLogout } from "react-google-login";

import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
// import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

const UserProfile = () => {
    const { user, token } = useSelector(state => state.auth);
    const [pins, setPins] = useState();
    const [text, setText] = useState("Created");
    const [activeBtn, setActiveBtn] = useState("created");
    const [profile, setProfile] = useState({});
    const navigate = useNavigate();
    const params = useParams();
    const userId = params[user._id]

    useEffect(() => {
      const getProfileFeed = async () => {
        try {
          const { data } = await axios.get(`http://localhost:3001/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setProfile(data);

          if (text === "Created" && userId) {
            const { data } = await axios.get(`http://localhost:3001/posts/${userId}/posts`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            setPins(data);
          } else if(text === "Saved" && userId) {
            const { data } = await axios.get(`http://localhost:3001/posts/${userId}/saved-posts`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            setPins(data);
          } 
        } catch (error) {
          console.log(error.message)
        }
      }

      getProfileFeed();
    }, [text, userId]);

    const logout = () => {
      localStorage.clear();
      navigate("/login");
    };
    if (!user) return <Spinner message="Loading profile" />;
    return (
      <div className="relative pb-2 h-full justify-center items-center">
        <div className="flex flex-col pb-5">
          <div className="relative flex flex-col mb-7">
            <div className="flex flex-col justify-center items-center">
              <img
                className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
                src="https://source.unsplash.com/1600x900/?nature,photography,technology"
                alt="user-pic"
              />
              <img
                className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
                // src={user.image}
                src={`http://localhost:3001/assets/${profile.picturePath}`}
                alt="user-pic"
              />
            </div>
            <h1 className="font-bold text-3xl text-center mt-3">
              {`${profile.firstName} ${profile.lastName}`}
            </h1>
          </div>
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("created");
              }}
              className={`${
                activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("saved");
              }}
              className={`${
                activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Saved
            </button>
          </div>
          <div className="px-2">
            <MasonryLayout pins={pins} />
          </div>
          {pins?.length === 0 && (
            <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
              No Pins Found!
            </div>
          )}
        </div>
      </div>
    );
};

export default UserProfile;
