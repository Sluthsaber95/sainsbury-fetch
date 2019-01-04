Cypress.Screenshot.defaults({ screenshotOnRunFailure: false })

describe('/search - As a user...', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })
  context('I can change', () => {
    it('settings to target "Audio"', () => {
      cy.get('input[type=radio]').check('audio')
    })
    it('settings to target "Audio" - will show me a list of 20 audio items ', () => {
      cy.get('input[type=radio]').check('audio')
      cy.get('ul').children('li').should('have.length', 20)
    })
  })
  context('When I pick', () => {
    const URLDesignated = '/asset/KSC-STS-131SSTA_01'
    it.only(`an image, it should take me to the designated URL ${URLDesignated}`, () => {
      cy.get('input[type=radio]').check('audio')
      const options = {
        force: true,
        multiple: true
      }
      cy.get('ul')
        .children('li')
        .first()
        .children('a')
        .should('have.attr', 'href', `${URLDesignated}`)
    })
  })
})
