import React from "react";
import { Link } from "react-router-dom";
import "./UserNotFound.scss";

export default function UserNotFound() {
  return (
    <div className="user-not-found">
      <p>User not found</p>
      <p>The link may be broken or the user has been removed</p>
      <Link to="/">Return to Home page</Link>
    </div>
  );
}
