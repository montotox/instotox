import React, { useState, useEffect } from "react";
import { size } from "lodash";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS, GET_FOLLOWING } from "../../../../gql/follow";
import ModalBasic from "../../../Modal/ModalBasic";
import ListUsers from "../../ListUsers";
import "./Followers.scss";

export default function Followers(props) {
  const { username, totalPublications } = props;
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [childrenModal, setChildrenModal] = useState(null);
  const {
    data: dataFollowers,
    loading: loadingFollowers,
    startPolling: startPollingFollowers,
    stopPolling: stopPollingFollowers,
  } = useQuery(GET_FOLLOWERS, {
    variables: {
      username: username,
    },
  });

  const {
    data: dataFollowing,
    loading: loadingFollowing,
    startPolling: startPollingFollowing,
    stopPolling: stopPollingFollowing,
  } = useQuery(GET_FOLLOWING, {
    variables: { username },
  });

  //Not recomend tu use, because stress to server
  useEffect(() => {
    startPollingFollowers(1000);
    return () => {
      stopPollingFollowers();
    };
  }, [startPollingFollowers, stopPollingFollowers]);
  useEffect(() => {
    startPollingFollowing(1000);
    return () => {
      stopPollingFollowing();
    };
  }, [startPollingFollowing, stopPollingFollowing]);

  const openFollowers = () => {
    setTitleModal("Followers");
    setChildrenModal(
      <ListUsers users={getFollowers} setShowModal={setShowModal} />
    );
    setShowModal(true);
  };

  const openFollowing = () => {
    setTitleModal("Following");
    setChildrenModal(
      <ListUsers users={getFollowing} setShowModal={setShowModal} />
    );
    setShowModal(true);
  };

  if (loadingFollowers || loadingFollowing) return null;
  const { getFollowers } = dataFollowers;
  const { getFollowing } = dataFollowing;

  return (
    <>
      <div className="followers">
        <p>
          <span>{totalPublications}</span> posts
        </p>
        <p className="link" onClick={openFollowers}>
          <span>{size(getFollowers)}</span> followers
        </p>
        <p className="link" onClick={openFollowing}>
          <span>{size(getFollowing)}</span> following
        </p>
      </div>
      <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
        {childrenModal}
      </ModalBasic>
    </>
  );
}
