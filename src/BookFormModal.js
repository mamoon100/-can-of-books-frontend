import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";
class BookFormModal extends Component {
  render() {
    console.log(this.props.chosen);
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {this.props.update ? "Update Your Book" : "Add Your Book"}
          </Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={
            this.props.update
              ? this.props.handleUpdate
              : this.props.handleAddition
          }
        >
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>
                Email address (if empty will send the sign in email by default)
              </Form.Label>
              <Form.Control
                type="email"
                placeholder={this.props.auth0.user.email}
                id="email"
                defaultValue={
                  this.props.update ? this.props.chosen[0].email : ""
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Lord of the Ring"
                id="title"
                defaultValue={
                  this.props.update ? this.props.chosen[0].title : ""
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="In Stock"
                id="status"
                defaultValue={
                  this.props.update ? this.props.chosen[0].status : ""
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Book Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                id="desc"
                defaultValue={
                  this.props.update ? this.props.chosen[0].desc : ""
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Discard
            </Button>
            <Button type="submit" variant="primary">
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default withAuth0(BookFormModal);
