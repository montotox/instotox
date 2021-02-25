import React, { useState } from "react";
import { Container, Image } from "semantic-ui-react";
import logoInstotox from "../../assets/png/logoInstotox.png";
import RegisterForm from "../../components/Auth/RegisterForm";
import LoginForm from "./../../components/Auth/LoginForm";
import "./Auth.scss";

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <Container fluid className="auth">
      <Image src={logoInstotox} />
      <div className="container-form">
        {showLogin ? (
          <LoginForm />
        ) : (
          <RegisterForm setShowLogin={setShowLogin} />
        )}
      </div>
      <div className="change-form">
        <p>
          {showLogin ? (
            <>
              Not registered yet?
              <span onClick={() => setShowLogin(!showLogin)}>Sign up</span>
            </>
          ) : (
            <>
              Loggin with your account!
              <span onClick={() => setShowLogin(!showLogin)}>Sign in</span>
            </>
          )}
        </p>
      </div>
    </Container>
  );
}
