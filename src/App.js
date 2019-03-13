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

  getId = () => Math.floor( (1 + Math.random()) * 100000 );

  addFlashcard = (flashcardData) => {
    let flashcard = { id: this.getId(), ...flashcardData, }
    this.setState( { flashcards: [...this.state.flashcards, flashcard ] } )
  }

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

  // Toggle the Add New Item Form
  toggleForm = () => this.setState({ showForm: !this.state.showForm, });

  // 
  toggleDescription = (id) => {
    const flashcards = this.state.flashcards.map( (flashcard) => {
      console.log(flashcard)
      if (flashcard.id === id)
        flashcard.showDescription = !flashcard.showDescription
      return flashcard 
    });
    this.setState({ flashcards: flashcards, });
  }

  render() {
    return (
      <Container  style={ { paddingTop: "25px", } }>
        <Header textAlign='center' as='h2' >React Contact List</Header>
        <br />
        <div>
          <Button icon color="blue" onClick={this.toggleForm}>
            <Icon name={`angle double ${this.state.showForm ? "up" : "down"}`} />
          </Button>
          { this.state.showForm ? <FlashcardForm addFlashcard={this.addFlashcard} /> : null }
        </div>
        <Divider clearing />
        <Flashcards flashcardList={this.state.flashcards} edit={this.editFlashcard} toggleDescription={this.toggleDescription}/>
      </Container>
    );
  }
}

export default App;
