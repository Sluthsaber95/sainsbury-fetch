describe('/search - As a user...', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })
  xcontext('I see', () => {
    it('An empty search field', () => {
      const emptyString = ''
      cy.get('input[type=text].search-bar').should('have.text', '')
    })
    it('Within the search box - text "Search"', () => {
      cy.get('input[type=text].search-bar').should(
        'have.attr',
        'placeholder',
        'Search'
      )
    })
    it('Default Images (plural) below the search bar"', () => {
      cy.get('.img-display')
        .children()
        .should('have.length', 20)
    })
  })
  context('When I type', () => {
    it('0, 1 or 2 Characters - the default screen will not change (i.e. default images are still present)', () => {})
    it('3 or more characters - a search initiates that returns me back images from my search', () => {})
    it('Typing an unrecoginisable set of characters - should show me "Sorry, we couldn\'t find the results you were looking for" ', () => {})
  })
})
