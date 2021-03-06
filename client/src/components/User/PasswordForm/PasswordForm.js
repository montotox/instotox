import React from "react";
import { Form, Button, FormField } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./PasswordForm.scss";

export default function PasswordForm() {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      currentPassword: Yup.string().required(),
      newPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("repeatNewPassword")]),
      repeatNewPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("newPassword")]),
    }),
    onSubmit: (formData) => {
      console.log("Form sent");
      console.log(formData);
    },
  });
  return (
    <Form className="password-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        type="password"
        placeholder="Current password"
        name="currentPassword"
        value={formik.values.currentPassword}
        onChange={formik.handleChange}
        error={formik.errors.currentPassword && true}
      />
      <Form.Input
        type="password"
        placeholder="New password"
        name="newPassword"
        value={formik.values.newPassword}
        onChange={formik.handleChange}
        error={formik.errors.newPassword && true}
      />
      <Form.Input
        type="password"
        placeholder="Repeat new password"
        name="repeatNewPassword"
        values={formik.values.repeatNewPassword}
        onChange={formik.handleChange}
        error={formik.errors.repeatNewPassword && true}
      />
      <Button type="submit" className="btn-submit">
        Update
      </Button>
    </Form>
  );
}

function initialValues() {
  return {
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  };
}
