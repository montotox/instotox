import React from "react";
import "./Followers.scss";

export default function Followers(props) {
  const { username } = props;
  return (
    <div className="followers">
      <p>
        <span>**</span> publications
      </p>
      <p className="link">
        <span>**</span> followers
      </p>
      <p className="link">
        <span>**</span> follow
      </p>
    </div>
  );
}
