import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_LIKE,
  IS_LIKE,
  DELETE_LIKE,
  COUNT_LIKES,
} from "../../../../gql/like";
import { Icon } from "semantic-ui-react";
import "./Actions.scss";

export default function Actions(props) {
  const { publication } = props;
  const [loadingAction, setLoadingAction] = useState(false);
  const [addLike] = useMutation(ADD_LIKE);
  const [deleteLike] = useMutation(DELETE_LIKE);
  const { data, loading, refetch } = useQuery(IS_LIKE, {
    variables: {
      idPublication: publication.id,
    },
  });

  const {
    data: dataCount,
    loading: loadingCount,
    refetch: refetchCount,
  } = useQuery(COUNT_LIKES, {
    variables: {
      idPublication: publication.id,
    },
  });

  const onAddLike = async () => {
    setLoadingAction(true);
    try {
      await addLike({
        variables: {
          idPublication: publication.id,
        },
      });
      refetch();
      refetchCount();
    } catch (error) {
      console.log(error);
    }
    setLoadingAction(false);
  };

  const onDeleteLike = async () => {
    setLoadingAction(true);
    try {
      await deleteLike({
        variables: {
          idPublication: publication.id,
        },
      });
      refetch();
      refetchCount();
    } catch (error) {
      console.log(error);
    }
    setLoadingAction(false);
  };

  const onAction = () => {
    if (!loadingAction) {
      if (isLiked) {
        onDeleteLike();
      } else {
        onAddLike();
      }
    }
  };

  if (loading || loadingCount) return null;
  const { isLiked } = data;
  const { countLikes } = dataCount;

  return (
    <div className="action">
      <Icon
        className={isLiked ? "like active" : "like"}
        name={isLiked ? "heart" : "heart outline"}
        onClick={onAction}
      />
      {countLikes} {countLikes == 1 ? "Like" : "Likes"}
    </div>
  );
}
