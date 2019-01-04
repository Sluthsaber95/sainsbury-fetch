Cypress.Screenshot.defaults({ screenshotOnRunFailure: false })

describe('/search - As a user...', () => {
  beforeEach(() => {
    cy.clock()
    const URLDesignated = '/asset/KSC-99pp0496'
    cy.visit(`http://localhost:3000${URLDesignated}`)
    cy.tick(5000)
  })
  context('I visit this page', () => {
    it('has an image', () => {
      cy.get('img')
    })
  })
  /*
    Testing for description, caption and title is presently
    too flaky. To add to that, creating asset__spec--audio
    will not be initiated
  */
})
