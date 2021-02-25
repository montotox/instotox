import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../../gql/user";
import "./RegisterForm.scss";

export default function RegisterForm(props) {
  const { setShowLogin } = props;
  const [register] = useMutation(REGISTER);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      name: Yup.string().required("Name is obligatory"),
      username: Yup.string()
        .matches(/^[a-zA-Z0-9-]*$/, "username musn't have spaces")
        .required(true),
      email: Yup.string().email("Invalid e-mail").required(true),
      password: Yup.string()
        .required("Password is obligatory")
        .oneOf([Yup.ref("repeatPassword", "Passwords doesn't matches")]),
      repeatPassword: Yup.string()
        .required("Repeat password ir obligatory")
        .oneOf([Yup.ref("password", "Passwords doesn't matches")]),
    }),
    onSubmit: async (FormData) => {
      try {
        const newUser = FormData;
        delete newUser.repeatPassword;
        await register({
          variables: {
            input: newUser,
          },
        });
        toast.success("User registered!");
        setShowLogin(true);
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    },
  });

  return (
    <>
      <h2 className="register-form-title">Register Form</h2>
      <Form className="register-form" onSubmit={formik.handleSubmit}>
        <Form.Input
          type="text"
          placeholder="Name and surname"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name && true}
        />
        <Form.Input
          type="text"
          placeholder="Username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.errors.username && true}
        />
        <Form.Input
          type="text"
          placeholder="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
        />
        <Form.Input
          type="password"
          placeholder="Password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password && true}
        />
        <Form.Input
          type="password"
          placeholder="Repeat Password"
          name="repeatPassword"
          value={formik.values.repeatPassword}
          onChange={formik.handleChange}
          error={formik.errors.repeatPassword && true}
        />
        <Button type="submit" className="btn-submit">
          Register
        </Button>
        <Button
          type="button"
          className="btn-trash"
          onClick={formik.handleReset}
        >
          Trash Form
        </Button>
      </Form>
    </>
  );
}

function initialValues() {
  return {
    name: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  };
}
