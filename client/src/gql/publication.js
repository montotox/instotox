import { gql } from "@apollo/client";

export const PUBLISH = gql`
  mutation publish($file: Upload) {
    publish(file: $file) {
      status
      urlFile
    }
  }
`;
export const GET_PUPLICATIONS = gql`
  query getPublications($username: String!) {
    getPublications(username: $username) {
      id
      idUser
      file
      typeFile
    }
  }
`;
