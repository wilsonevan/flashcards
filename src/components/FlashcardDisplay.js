import React from "react";
import FlashcardForm from "./FlashcardForm";
import {Card, Button, Modal, } from "semantic-ui-react";

// The purpose of this function is to display each flashcard and its options
const FlashcardDisplay = ( { id, title, description, showDescription, options, edit, toggleDescription, remove, setMiss, setCorrect,  }, ) => (
  <Card fluid key={ id }>
  
    {/* TITLE: Header and description toggle button */}
    <Card.Content>
      {
        showDescription ? 
          <Button.Group floated='right'>
            <Button basic color="blue" onClick={() => toggleDescription(id)}>Hide</Button>
            <Modal trigger={<Button basic color='green' icon='pencil'></Button>}>
              <Modal.Header>Edit Info</Modal.Header>
              <Modal.Content >
                <FlashcardForm editFlashcard={edit} id={id} />
              </Modal.Content>
            </Modal>
            <Button basic color='red' icon='trash alternate outline' onClick={() => remove(id)}></Button>
          </Button.Group>
          : 
          <Button.Group floated='right'>
            <Button color="blue" onClick={() => toggleDescription(id)}>Show</Button>
            <Modal trigger={<Button basic color='green' icon='pencil'></Button>}>
              <Modal.Header>Edit Info</Modal.Header>
              <Modal.Content >
                <FlashcardForm editFlashcard={edit} id={id} />
              </Modal.Content>
            </Modal>
            <Button basic color='red' icon='trash alternate outline' onClick={() => remove(id)}></Button>
          </Button.Group>
        }
      <Card.Header  style={ { paddingTop: "10px", paddingLeft: "10px"} }>{ title }</Card.Header>
    </Card.Content> 

    {/* DESCRIPTION: Shows the description of the flashcard, if enabled */}
    {showDescription ? <Card.Content description={ description } /> : null }

    {/* OPTIONS: Allows the user to edit or delete the flashcard */}
    <Card.Content textAlign="center" extra>
      <Button.Group >
        <Button onClick={() => setMiss(id)}>Missed</Button>
        <Button.Or />
        <Button positive onClick={() => setCorrect(id)}>Correct</Button>
      </Button.Group>
    </Card.Content>
  </Card>
);

export default FlashcardDisplay;