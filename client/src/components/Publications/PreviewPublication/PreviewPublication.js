import React from "react";
import { Image, PlaceholderImage } from "semantic-ui-react";
import "./PreviewPublication.scss";

export default function PreviewPublication(props) {
  const { publication } = props;
  return (
    <>
      <div className="preview-publication">
        <Image className="preview-publication__imgage" src={publication.file} />
      </div>
    </>
  );
}
