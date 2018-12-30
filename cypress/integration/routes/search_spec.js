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
    shortWordSet.forEach(wordLength => {
      const { list } = wordLength
      list.forEach(word => {
        it(`${
          wordLength.description
        } the default screen will not change when entering ${word}`, () => {
          const defaultAlt = 'KSC-99pp0496'
          cy.get('.search-bar').type(word)

          cy.get('.img-display')
            .children('.img-thumb')
            .should('have.attr', 'alt', defaultAlt)
        })
      })
    })
    xit('3 or more characters - a search initiates that returns me back images from my search', () => {})
    xit('Typing an unrecoginisable set of characters - should show me "Sorry, we couldn\'t find the results you were looking for" ', () => {})
  })
})
