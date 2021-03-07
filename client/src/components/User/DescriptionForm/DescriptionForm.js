import React from "react";
import { Form, TextArea, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";
import "./DescriptionForm.scss";

export default function DescriptionForm(props) {
  const { setShowModal, currentDescription, refetch } = props;
  const [updateUser] = useMutation(UPDATE_USER);
  const formik = useFormik({
    initialValues: {
      description: currentDescription || "",
    },
    validationSchema: Yup.object({
      description: Yup.string().required(),
    }),
    onSubmit: async (FormData) => {
      try {
        await updateUser({
          variables: {
            input: FormData,
          },
        });
        refetch();
        setShowModal(false);
      } catch (error) {
        toast.error("Error updating the description");
      }
    },
  });
  return (
    <div>
      <Form className="description-form" onSubmit={formik.handleSubmit}>
        <TextArea
          placeholder="Add your description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          className={formik.errors.description && "error"}
        />
        <Button type="submit" className="btn-submit">
          Update description
        </Button>
      </Form>
    </div>
  );
}
