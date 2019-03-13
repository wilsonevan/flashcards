import React from "react";
import FlashcardDisplay from "./FlashcardDisplay"
import {Card, } from "semantic-ui-react";

const Flashcards = ({ flashcardList, edit, toggleDescription, }, ) => (
  <Card.Group>
    { 
      flashcardList.map( ( flashcard, index, ) => (
        <FlashcardDisplay key={index} {...flashcard} edit={edit} toggleDescription={toggleDescription}/>
      ))
    }
  </Card.Group>
)

export default Flashcards;