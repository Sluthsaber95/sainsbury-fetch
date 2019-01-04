# Acceptance Criteria
## ImgSearch Cypress Tests

Images shown initially is 20 images - we can ramp it later on, but for now let's just get images to fill 1080 p screen

/Home Page
/Home Page /Images Search

As a user I
- Should See
  - An empty search field
  - Within the search box - text "Search"
  - Default Images (plural) below the search bar

- When I type
- 0, 1 or 2 characters the default screen will not change (i.e. default images are still present)
- 3 or more characters initiates the search should start the search. Test strings
  - Apollo 11
  - Mars
  - Mars Rover
  - ISS
- Typing an unrecoginisable word or set of characters should show the user
  - The "Sorry, we couldn/'t find the results you were looking for"

## Footnotes -
Note: Additional Tests here are not included in the current
- Sanitize Data tests for JS scripts inserted into input field


