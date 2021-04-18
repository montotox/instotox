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
          <GridColumn
            textAlign="center"
            computer={2}
            tablet={2}
            mobile={8}
            className="header__logo"
          >
            <Link to="/">
              <Image src={Logo} alt="Instotox" />
            </Link>
          </GridColumn>
          <GridColumn computer={9} tablet={9} only="tablet computer">
            <Search />
          </GridColumn>
          <GridColumn computer={5} tablet={5} mobile={8}>
            <RightHeader />
          </GridColumn>
        </Grid>
      </Container>
    </div>
  );
}
