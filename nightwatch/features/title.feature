Feature: Validate Ultimate QA page

  Scenario: Validate title, link status, and console logs
    Given I navigate to the "https://ultimateqa.com/automation"
    Then the page title should match "Automation Practice - Ultimate QA"
    Then all links should open correctly in a new tab and match their href
    Then I should see no JavaScript console errors