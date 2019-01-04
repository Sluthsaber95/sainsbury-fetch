Cypress.Screenshot.defaults({ screenshotOnRunFailure: false })

describe('/search - As a user...', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })
  context('I see', () => {
    it('An empty search field', () => {
      const emptyString = ''
      cy.get('input[type=text]').should('have.text', '')
    })
    it('Within the search box - text "Search"', () => {
      cy.get('input[type=text]').should(
        'have.attr',
        'placeholder',
        'Search'
      )
    })
    it('Default Images (plural) below the search bar"', () => {
      cy.get('.img-display__wrapper')
        .children('div')
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
          cy.get('input[type=text]').type(word)

          cy.get('.img-display')
            .find('.img-thumb')
            .should('have.attr', 'alt', defaultAlt)
        })
      })
    })

    longWordSet.forEach(word => {
      it(`3 or more characters - returns me different images than default for the word ${word}`, () => {
        cy.get('input[type=text]').type(word)

        cy.get('.img-display')
          .children('.img-thumb')
          .should('not.have.attr', 'alt', defaultAlt)
      })
    })
    unrecogWordSet.forEach(word => {
      it(`Typing an unrecoginisable set of characters - such as ${word} should show me "Sorry, we couldn\'t find the results you were looking for"`, () => {
        const noResultStatement =
          "Sorry! We couldn't find the results you were looking for"
        cy.get('input[type=text]').type(word)

        cy.get('.img-no-results')
          .first()
          .contains(noResultStatement)
      })
    })
  })
  context('When I pick', () => {
    const URLDesignated = '/asset/KSC-99pp0496'
    it(`an image, it should take me to the designated URL ${URLDesignated}`, () => {
      const options = {
        force: true,
        multiple: true
      }
      cy.get('.img-thumb')
        .first('div', { timeout: 5000})
        .click(options)

      cy.url().should('include', URLDesignated)
    })
  })
})
