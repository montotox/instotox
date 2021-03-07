import React from "react";
import { Form, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";
import "./WebsiteForm.scss";

export default function WebsiteForm(props) {
  const { setShowModal, currentWebsite, refetch } = props;
  const [updateUser] = useMutation(UPDATE_USER);
  const formik = useFormik({
    initialValues: {
      siteWeb: currentWebsite || "",
    },
    validationSchema: Yup.object({
      siteWeb: Yup.string().url().required(),
    }),
    onSubmit: async (formData) => {
      try {
        await updateUser({
          variables: {
            input: formData,
          },
        });
        refetch();
        setShowModal(false);
      } catch (error) {
        toast.error("Error updating website");
      }
    },
  });

  return (
    <div>
      <Form className="website-form" onSubmit={formik.handleSubmit}>
        <Form.Input
          placeholder="Add your website"
          name="siteWeb"
          value={formik.values.siteWeb}
          onChange={formik.handleChange}
          error={formik.errors.siteWeb && true}
        />
        <Button type="submit" className="btn-submit">
          Update website
        </Button>
      </Form>
    </div>
  );
}
