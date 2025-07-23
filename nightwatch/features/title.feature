Feature: Validate Ultimate QA page

  Scenario: Validate title, link status, and console logs
    Given I navigate to the "https://ultimateqa.com/automation"
    Then the page title should match "Automation Practice - Ultimate QA"
    Then all links should return valid status codes
    Then I should see no JavaScript console errors
