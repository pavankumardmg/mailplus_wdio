@puzzles @quickcrossword @ignore
Feature: QuickCrossWord

Business Need: define the business need for this feature

  Background: Puzzles page should be visible
    Given the Puzzles page
    And user should be signed in

  Scenario: Play the Quick Crossword
    When user select Quick Crossword
    And fill the Across
    And fill the Down
    Then user should see "Congratulations, you’ve completed the puzzle!" text in Quick Crossword modal

  Scenario: Verify the Quick Crossword options
    When user select Quick Crossword
    And click on the Options
    Then user should see following options in modal dialogue
      | Resume                  |
      | Restart                 |
      | Show Errors             |
      | Reveal Solution         |
      | How to play             |