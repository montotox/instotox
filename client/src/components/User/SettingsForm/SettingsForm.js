import React from "react";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import useAuth from "../../../hooks/useAuth";
import PasswordForm from "../PasswordForm";
import "./SettingsForm.scss";

export default function SettingsForm(props) {
  const { setShowModal, setTitleModal, setChildrenModal } = props;
  const history = useHistory();
  const client = useApolloClient();
  const { logout } = useAuth();
  const onChangePassword = () => {
    setTitleModal("Change your password");
    setChildrenModal(
      <div>
        <PasswordForm />
      </div>
    );
  };
  const onLogout = () => {
    client.clearStore();
    logout();
    history.push("/");
  };
  return (
    <div className="settings-form">
      <Button onClick={onChangePassword}>Change password</Button>
      <Button>Change email</Button>
      <Button>Change description</Button>
      <Button>Change website</Button>
      <Button onClick={onLogout}>Logout</Button>
      <Button onClick={() => setShowModal(false)}>Cancel</Button>
    </div>
  );
}
