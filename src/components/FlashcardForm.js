import React from "react";
import {Form, } from "semantic-ui-react";

// The purpose of this class is to render the form for either adding a new flashcard, or editing an existing one.
class FlashcardForm extends React.Component {
  state = { title: "", description: "", };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.addFlashcard) {
      this.props.addFlashcard(this.state);
      this.setState( { title: "", description: "", } );
    }
    else if (this.props.editFlashcard) {
      this.props.editFlashcard(this.props.id, this.state);
    }
  }
  
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input 
            fluid
            label="Title"
            placeholder="Title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <Form.Input 
            fluid
            label="Description"
            placeholder="Description"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <Form.Button style={ { marginTop: "25px", } } content='Submit' color="blue" />
        </Form.Group>
      </Form>
    );
  }
}

export default FlashcardForm