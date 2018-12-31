Cypress.Screenshot.defaults({ screenshotOnRunFailure: false })

describe('/search - As a user...', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })
  context('I see', () => {
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
    const defaultAlt = 'KSC-99pp0496'
    const alphanumVal = 'w2UpMdFy'
    const charList = alphanumVal.split('')
    const twoLettersList = charList.map(
      (letter, i) => letter + charList[charList.length - (i + 1)]
    )
    const shortWordSet = [
      {
        description: '1 Character',
        list: charList,
      },
      {
        description: '2 Characters',
        list: twoLettersList,
      },
    ]
    const longWordSet = ['Apollo', 'Apollo 11', 'Mars', 'Mars Rover', 'ISS']
    const unrecogWordSet = ['kaefianrea', 'asfeaf 14', 'ae3r12']

    shortWordSet.forEach(wordLength => {
      const { list } = wordLength
      list.forEach(word => {
        it(`${
          wordLength.description
        } the default screen will not change when entering ${word}`, () => {
          cy.get('.search-bar').type(word)

          cy.get('.img-display')
            .children('.img-thumb')
            .should('have.attr', 'alt', defaultAlt)
        })
      })
    })

    longWordSet.forEach(word => {
      it(`3 or more characters - a search initiates that returns me images, that are not the same as the default images - for the word ${word}`, () => {
        cy.get('.search-bar').type(word)

        cy.get('.img-display')
          .children('.img-thumb')
          .should('not.have.attr', 'alt', defaultAlt)
      })
    })
    unrecogWordSet.forEach(word => {
      it(`Typing an unrecoginisable set of characters - such as ${word} should show me "Sorry, we couldn\'t find the results you were looking for"`, () => {
        const noResultStatement =
          "Sorry! We couldn't find the results you were looking for"
        cy.get('.search-bar').type(word)

        cy.get('.img-no-results')
          .first()
          .contains(noResultStatement)
      })
    })
  })
})
