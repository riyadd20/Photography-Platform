import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import axios from "axios";

const Feed = ({path}) => {
  const { user, token } = useSelector((state) => state.auth);
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  
  const location = useLocation();
  
  if(path=='category' && location.state){
    path = location.state.path
  }

  useEffect(() => {
    const getFeed = async () => {
      // if(user)
        try {
          const { data } = await axios.get(`http://localhost:3001/${path}`, {
            headers: { Authorization: `Bearer ${token}` },
            // body: JSON.stringify({ id: user._id })
          });
          setPins(data.posts);
        } catch (error) {
          console.log(error.message);
        }
    };

    getFeed();
  },[path, user]);

  const ideaName = categoryId || "new";
  if (loading) {
    return (
      <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />
    );
  }
  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
