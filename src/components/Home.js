import React, { Component } from 'react';
import Flashcards from "./Flashcards"
import FlashcardForm from "./FlashcardForm"
import {Container, Header, Divider, Button, Icon, Grid, Segment, Rail, } from "semantic-ui-react";

class Home extends Component {
  state = { 
    flashcards: [
      { id: 1, title: "Math", description: "The science of numbers and their operations", showDescription: false, options: true, },
      { id: 2, title: "Science", description: "Knowledge about or study of the natural world based on facts learned through experiments and observation", showDescription: false, options: true, },
      { id: 3, title: "Art", description: "Something that is created with imagination and skill and that is beautiful or that expresses important ideas or feelings",showDescription: false, options: true, },
    ],
    showForm: false,
    missed: [],
    correct: [],
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

  // Sets the flashcard into the misses column
  // Also prevents duplicates,
  // Removes from correct column if already there
  setMiss = (id) => {
    let missedFlashcard = null;
    let duplicateCard = false;

    // Update flashcard with missed details, and store into array of missed cards
    this.state.flashcards.map( (flashcard) => {
      if (flashcard.id === id ) {
        missedFlashcard = flashcard
        missedFlashcard.options = false;
        missedFlashcard.correct = false;
      }
    });

    // Check for duplicate
    this.state.missed.map( (flashcard) => {
      if (flashcard.id === missedFlashcard.id)
        duplicateCard = true;
    });
    
    // Remove from Correct array
    const correctFlashcards = this.state.correct.filter( (flashcard) => {
      if (flashcard.id !== id) {
        return flashcard
      }
    });

    // Finally, update everything
    if (duplicateCard == false) {
      this.setState( { 
        missed: [...this.state.missed, missedFlashcard ],
        correct: correctFlashcards, 
      })
    } 
  }

  // Sets the flashcard into the correct column
  // Also prevents duplicates,
  // Removes from misses column if already there
  setCorrect = (id) => {
    let correctFlashcard = null;
    let duplicateCard = false;

    // Update flashcard with correct details, and store into array of correct cards
    this.state.flashcards.map( (flashcard) => {
      if (flashcard.id === id) {
        correctFlashcard = flashcard
        correctFlashcard.options = false;
        correctFlashcard.correct = true;
      }
    });

    // Check for duplicate
    this.state.correct.map( (flashcard) => {
      if (flashcard.id === correctFlashcard.id)
        duplicateCard = true;
    });

    // Remove from Missed array
    const missedFlashcards = this.state.missed.filter( (flashcard) => {
      if (flashcard.id !== id) {
        return flashcard
      }
    });

    // Finally, update everything
    if (duplicateCard == false) {
      this.setState( { 
        correct: [...this.state.correct, correctFlashcard ], 
        missed: missedFlashcards, 
      })
    };
  }

  render() {
    return (
      <Container  style={ { paddingTop: "25px", } }>
        <Header textAlign='center' as='h1' >React flashcard List</Header>
        <Grid centered columns={2}>
          <Grid.Column>
            <Segment>

              <div>
                <Button icon color="blue" onClick={this.toggleForm} labelPosition='right'>
                  <Icon name={`angle double ${this.state.showForm ? "up" : "down"}`} />
                  Add New
                </Button>
                {/* Shows the add-new-flashcard form if enabled */}
                <br />
                <br />
                { this.state.showForm ? <FlashcardForm addFlashcard={this.addFlashcard} /> : null } 
              </div>

              <Divider clearing />

              <Flashcards 
                flashcardList={this.state.flashcards} 
                edit={this.editFlashcard} 
                toggleDescription={this.toggleDescription} 
                remove={this.removeFlashcard}
                setMiss={this.setMiss}
                setCorrect={this.setCorrect}
                />
                
              <Rail attached position='left'>
                <Segment>
                  <Header textAlign='center' as='h3' >Missed Flashcards</Header>
                  <Flashcards 
                    flashcardList={this.state.missed}
                    // edit={this.editFlashcard} 
                    toggleDescription={this.toggleDescription} 
                    // remove={this.removeFlashcard}
                    setMiss={this.setMiss}
                    setCorrect={this.setCorrect}
                  />
                </Segment>
              </Rail>  

              <Rail attached position='right'>
                <Segment>
                  <Header textAlign='center' as='h3' >Correct Flashcards</Header>
                  <Flashcards 
                    flashcardList={this.state.correct} 
                    // edit={this.editFlashcard} 
                    toggleDescription={this.toggleDescription} 
                    // remove={this.removeFlashcard}
                    setMiss={this.setMiss}
                    setCorrect={this.setCorrect}
                  />
                </Segment>
              </Rail>

            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default Home;
