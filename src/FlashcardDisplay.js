import React from "react";
import FlashcardForm from "./FlashcardForm";
import {Card, Button, Modal, } from "semantic-ui-react";

const FlashcardDisplay = ( { id, title, description, showDescription, edit,  toggleDescription }, ) => (
  
  <Card key={ id }>
    
    <Card.Content>
      {showDescription ? <Button basic color="blue" floated="right" onClick={() => toggleDescription(id)}>Hide</Button> : <Button basic color="blue" floated="right" onClick={() => toggleDescription(id)}>Show</Button> }
      {/* <br /> */}
      <Card.Header  style={ { paddingTop: "15px", paddingLeft: "10px"} }>{ title }</Card.Header>
    </Card.Content> 
    {showDescription ? <Card.Content description={ description } /> : null }
    <Card.Content extra>
        <div className='ui two buttons'>
      
          <Modal 
            trigger={<Button basic color='green'>Edit</Button>}
          >
            <Modal.Header>Edit Info</Modal.Header>
            <Modal.Content >
              <FlashcardForm editFlashcard={edit} id={id} />
            </Modal.Content>
            {/* <Modal.Actions actions={['Snooze', { key: 'done', content: 'Done', positive: true }]} /> */}
          </Modal>
          {/* <Button basic color='green'>Edit</Button> */}
          <Button basic color='red'>
            Delete
          </Button>
        </div>
      </Card.Content>
  </Card>
);

export default FlashcardDisplay;