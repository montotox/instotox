import React, { useState, useEffect } from "react";
import { Search as SearchSUI, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { size } from "lodash";
import { useQuery } from "@apollo/client";
import { SEARCH } from "../../../gql/user";
import ImageNotFound from "../../../assets/png/avatar.png";
import "./Search.scss";

export default function Search() {
  const [search, setSearch] = useState(null);
  const [results, setResults] = useState([]);
  const { data, loading } = useQuery(SEARCH, {
    variables: { search },
  });
  useEffect(() => {
    if (size(data?.search) > 0) {
      const users = [];
      data.search.forEach((user, index) => {
        users.push({
          key: index,
          title: user.name,
          username: user.username,
          avatar: user.avatar,
        });
      });
      setResults(users);
    } else {
      setResults([]);
    }
  }, [data]);

  const onChange = (e) => {
    if (e.target.value) setSearch(e.target.value);
    else setSearch(null);
  };

  const handleResultSelect = () => {
    setSearch(null);
    setResults([]);
  };
  return (
    <SearchSUI
      className="search"
      fluid
      input={{ icon: "search", iconPosition: "left" }}
      loading={loading}
      value={search || ""}
      onResultSelect={handleResultSelect}
      onSearchChange={onChange}
      results={results}
      resultRenderer={(e) => <ResultSearch data={e} />}
    />
  );
}

function ResultSearch(props) {
  const { data } = props;
  return (
    <Link className="search__item" to={`/${data.username}`}>
      <Image src={data.avatar || ImageNotFound} />
      <div>
        <p> {data.title} </p>
        <p> {data.username} </p>
      </div>
    </Link>
  );
}
