@puzzles @guessword @ignore
Feature: GuessWord

Business Need: define the business need for this feature

  Background: Puzzles page should be visible
    Given the Puzzles page
    And user should be signed in

  Scenario: GuessWord
    When user select GuessWord
    And fill the GuessWord solution
    And click on Check button
    Then user should see "Congratulations, you’ve completed the puzzle!" text in GuessWord modal