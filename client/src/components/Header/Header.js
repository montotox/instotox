import React from "react";
import { Container, Grid, Image, GridColumn } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Logo from "../../assets/png/logoInstotox.png";
import RightHeader from "./RightHeader";
import Search from "./Search";
import "./Header.scss";

export default function Header() {
  return (
    <div className="header">
      <Container>
        <Grid>
          <GridColumn width={3} className="header__logo">
            <Link to="/">
              <Image src={Logo} alt="Instotox" />
            </Link>
          </GridColumn>
          <GridColumn width={10}>
            <Search />
          </GridColumn>
          <GridColumn width={3}>
            <RightHeader />
          </GridColumn>
        </Grid>
      </Container>
    </div>
  );
}
