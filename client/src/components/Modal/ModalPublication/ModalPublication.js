import React from "react";
import { Modal, Grid, GridRow } from "semantic-ui-react";
import "./ModalPublication.scss";
import Comments from "./Comments";
import Actions from "./Actions";
import CommentForm from "./CommentForm";

export default function ModalPublication(props) {
  const { show, setShow, publication } = props;
  const onClose = () => setShow(false);
  return (
    <Modal open={show} onClose={onClose} className="modal-publication">
      <Grid>
        <GridRow className="modal-publication__row">
          <Grid.Column
            className="modal-publication__left"
            computer={10}
            tablet={10}
            mobile={16}
            style={{ backgroundImage: `url("${publication.file}")` }}
          />
          <Grid.Column
            className="modal-publication__right"
            computer={6}
            tablet={6}
            only="tablet computer"
          >
            <Comments publication={publication} />
            <Actions publication={publication} />
            <CommentForm publication={publication} />
          </Grid.Column>
        </GridRow>
        <GridRow only="mobile" className="modal-publication__right">
          <Comments publication={publication} />
          <Actions publication={publication} />
          <CommentForm publication={publication} />
        </GridRow>
      </Grid>
    </Modal>
  );
}
