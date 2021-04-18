import React from "react";
import { Grid } from "semantic-ui-react";
import Feed from "../../components/Home/Feed";
import UsersNotFolloweds from "../../components/Home/UsersNotFolloweds";
import "./Home.scss";

export default function Home() {
  return (
    <Grid className="home">
      <Grid.Column className="home__left" computer={12} mobile={16}>
        <Feed />
      </Grid.Column>
      <Grid.Column
        className="home__right"
        computer={4}
        tablet={4}
        only="tablet computer"
      >
        <UsersNotFolloweds />
      </Grid.Column>
    </Grid>
  );
}
