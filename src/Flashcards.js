import React from "react";
import FlashcardDisplay from "./FlashcardDisplay"
import {Card, } from "semantic-ui-react";

// The purpose of this function is to map through all of the flashcards, 
// and then display them using the FlashcardDisplay function.
const Flashcards = ({ flashcardList, edit, toggleDescription, remove, setMiss, setCorrect, option, }, ) => (
  <Card.Group>
    { 
      flashcardList.map( ( flashcard, index, ) => (
        <FlashcardDisplay 
          key={index} 
          {...flashcard} 
          edit={edit} 
          toggleDescription={toggleDescription}
          remove={remove}
          setMiss={setMiss}
          setCorrect={setCorrect}
          />
      ))
    }
  </Card.Group>
)

export default Flashcards;