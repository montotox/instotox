import React from "react";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import useAuth from "../../../hooks/useAuth";
import PasswordForm from "../PasswordForm";
import EmailForm from "../EmailForm";
import DescriptionForm from "../DescriptionForm";
import WebsiteForm from "../WebsiteForm";
import "./SettingsForm.scss";

export default function SettingsForm(props) {
  const {
    setShowModal,
    setTitleModal,
    setChildrenModal,
    getUser,
    refetch,
  } = props;
  const history = useHistory();
  const client = useApolloClient();
  const { logout } = useAuth();
  const onChangePassword = () => {
    setTitleModal("Change your password");
    setChildrenModal(
      <div>
        <PasswordForm logout={onLogout} />
      </div>
    );
  };

  const onChangeEmail = () => {
    setTitleModal("Change email");
    setChildrenModal(
      <EmailForm
        setShowModal={setShowModal}
        currentEmail={getUser.email}
        refetch={refetch}
      />
    );
  };

  const onChangeDescription = () => {
    setTitleModal("Change description");
    setChildrenModal(
      <DescriptionForm
        setShowModal={setShowModal}
        currentDescription={getUser.description}
        refetch={refetch}
      />
    );
  };

  const onChangeWebsite = () => {
    setTitleModal("Change website");
    setChildrenModal(
      <WebsiteForm
        setShowModal={setShowModal}
        currentWebsite={getUser.siteWeb}
        refetch={refetch}
      />
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
      <Button onClick={onChangeEmail}>Change email</Button>
      <Button onClick={onChangeDescription}>Change description</Button>
      <Button onClick={onChangeWebsite}>Change website</Button>
      <Button onClick={onLogout}>Logout</Button>
      <Button onClick={() => setShowModal(false)}>Cancel</Button>
    </div>
  );
}
