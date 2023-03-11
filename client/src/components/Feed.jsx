import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import axios from "axios";

const Feed = () => {
  const { token } = useSelector((state) => state.auth);
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    const getFeed = async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/posts', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPins(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getFeed();
  },[]);

  const ideaName = categoryId || "new";
  if (loading) {
    return (
      <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />
    );
  }
  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
