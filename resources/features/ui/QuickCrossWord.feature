@ui @puzzles @quickcrossword
Feature: QuickCrossWord

Business Need: define the business need for this feature

  Background:
    When user loads puzzle page
    And user select "Quick Crossword"
    And close the tooltip

  @debug
  Scenario: Play the Quick Crossword
    When fill the Across
    And fill the Down
    Then user should see "Congratulations, you’ve completed the puzzle!" text in Quick Crossword modal

  @debug
  Scenario: Verify the Quick Crossword options
    When click on the Options
    Then user should see following options in modal dialogue
      | Resume          |
      | Restart         |
      | Show Errors     |
      | Reveal Solution |
      | How to play     |