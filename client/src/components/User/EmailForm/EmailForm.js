import React from "react";
import { Form, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";
import "./EmailForm.scss";

export default function EmailForm(props) {
  const { setShowModal, currentEmail, refetch } = props;
  const [updateUser] = useMutation(UPDATE_USER);
  const formik = useFormik({
    initialValues: {
      email: currentEmail || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
    }),
    onSubmit: async (formData) => {
      try {
        await updateUser({
          variables: {
            input: formData,
          },
        });
        //when you use refetch you make 1 request to server
        refetch();
        //If you refresh apollo cache without 1 request to server, you want to

        setShowModal(false);
      } catch (error) {
        toast.error("Error when changing email");
      }
    },
  });
  return (
    <div>
      <Form className="email-form" onSubmit={formik.handleSubmit}>
        <Form.Input
          placeholder="Type new email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email && true}
        />
        <Button type="submit" className="btn-submit">
          Update email
        </Button>
      </Form>
    </div>
  );
}
