import React from "react";
import FlashcardForm from "./FlashcardForm";
import {Card, Button, Modal, } from "semantic-ui-react";

// The purpose of this function is to display each flashcard and its options
const FlashcardDisplay = ( { id, title, description, showDescription, edit,  toggleDescription, remove, }, ) => (
  <Card key={ id }>

    {/* TITLE: Header and description toggle button */}
    <Card.Content>
      {showDescription ? <Button basic color="blue" floated="right" onClick={() => toggleDescription(id)}>Hide</Button> : <Button color="blue" floated="right" onClick={() => toggleDescription(id)}>Show</Button> }
      <Card.Header  style={ { paddingTop: "15px", paddingLeft: "10px"} }>{ title }</Card.Header>
    </Card.Content> 

    {/* DESCRIPTION: Shows the description of the flashcard, if enabled */}
    {showDescription ? <Card.Content description={ description } /> : null }

    {/* OPTIONS: Allows the user to edit or delete the flashcard */}
    <Card.Content extra>
      <div className='ui two buttons'>
        <Modal trigger={<Button basic color='green'>Edit</Button>}>
          <Modal.Header>Edit Info</Modal.Header>
          <Modal.Content >
            <FlashcardForm editFlashcard={edit} id={id} />
          </Modal.Content>
        </Modal>
        <Button basic color='red' onClick={() => remove(id)}>Delete</Button>
      </div>
    </Card.Content>
  </Card>
);

export default FlashcardDisplay;