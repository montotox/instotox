import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../../gql/user";
import { setToken, decodeToken } from "../../../utils/token";
import "./LoginForm.scss";
import useAuth from "../../../hooks/useAuth";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [login] = useMutation(LOGIN);
  const { setUser } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid e-mail").required(true),
      password: Yup.string().required("Password is obligatory"),
    }),
    onSubmit: async (FormData) => {
      setError("");
      try {
        const { data } = await login({
          variables: {
            input: FormData,
          },
        });
        const { token } = data.login;
        setToken(token);
        setUser(decodeToken(token));
      } catch (error) {
        setError(error.message);
      }
    },
  });
  return (
    <>
      <h2 className="login-form-title">Login Form</h2>
      <Form className="login-form" onSubmit={formik.handleSubmit}>
        <Form.Input
          type="text"
          placeholder="Enter your email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email && true}
        />
        <Form.Input
          type="password"
          placeholder="Enter your password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password && true}
        />
        <Button type="submit" className="btn-submit">
          Sign In
        </Button>
        {error && <p className="submit-error">{error}</p>}
      </Form>
    </>
  );
}

function initialValues() {
  return {
    email: "",
    password: "",
  };
}
