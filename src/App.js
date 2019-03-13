import React, { Component } from 'react';
import Flashcards from "./Flashcards"
import FlashcardForm from "./FlashcardForm"
import {Container, Header, Divider, Button, Icon} from "semantic-ui-react";

class App extends Component {
  state = { 
    flashcards: [
      { id: 1, title: "Math", description: "The science of numbers and their operations", showDescription: false, },
      { id: 2, title: "Science", description: "Knowledge about or study of the natural world based on facts learned through experiments and observation", showDescription: false, },
      { id: 3, title: "Art", description: "Something that is created with imagination and skill and that is beautiful or that expresses important ideas or feelings",showDescription: false, },
    ],
    showForm: false,
  };

  // Generates a relatively random ID with low probability of duplicates for small database
  getId = () => Math.floor( (1 + Math.random()) * 100000 );

  // Lets the user add a new flashcard to their array
  addFlashcard = (flashcardData) => {
    let flashcard = { id: this.getId(), ...flashcardData, }
    this.setState( { flashcards: [...this.state.flashcards, flashcard ] } )
  }

  // Allows a user to edit an existing flashcard's title or description
  editFlashcard = (id, newData) => {
    // Concatinate new data with existing id
    let updatedFlashcard = {id, ...newData, showDescription: true, }

    // Navigate through each flashcard and compare with the updated ID
    // Once the original card with the updated ID is found, overwrite it
    // Finally, re-sav the entire array with the updated data
    const flashcards = this.state.flashcards.map( (flashcard) => {
      return (flashcard.id === updatedFlashcard.id) ? updatedFlashcard : flashcard ;    
    });
    this.setState({ flashcards: flashcards, });
  }

  // Removes the flashcard from the array
  removeFlashcard = (id) => {
    const flashcards = this.state.flashcards.filter( flashcard => {
      if (flashcard.id !== id)
        return flashcard
    });
    this.setState({ flashcards, });
  }

  // Toggle the Add New Item Form
  toggleForm = () => this.setState({ showForm: !this.state.showForm, });

  // Toggle the Description of the item. 
  // Similar function to the edit 
  toggleDescription = (id) => {
    const flashcards = this.state.flashcards.map( (flashcard) => {
      if (flashcard.id === id)
        flashcard.showDescription = !flashcard.showDescription
      return flashcard 
    });
    this.setState({ flashcards: flashcards, });
  }

  render() {
    return (
      <Container  style={ { paddingTop: "25px", } }>

        <Header textAlign='center' as='h1' >React flashcard List</Header>
        <div>
          <Button icon color="blue" onClick={this.toggleForm}>
            <Icon name={`angle double ${this.state.showForm ? "up" : "down"}`} />
          </Button>
          {/* Shows the add-new-flashcard form if enabled */}
          { this.state.showForm ? <FlashcardForm addFlashcard={this.addFlashcard} /> : null } 
        </div>

        <Divider clearing />

        <Flashcards 
          flashcardList={this.state.flashcards} 
          edit={this.editFlashcard} 
          toggleDescription={this.toggleDescription} 
          remove={this.removeFlashcard}
          />

      </Container>
    );
  }
}

export default App;
