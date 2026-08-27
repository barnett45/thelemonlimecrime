describe('The Lemon Lime Crime', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('names the picture in the hero', () => {
    cy.get('h1').should('contain.text', 'The Lemon Lime Crime')
  })

  it('runs the getaway sequence off the scroll position', () => {
    cy.get('[role="progressbar"]').should('have.attr', 'aria-valuenow', '0')
    /* the scroll track only has its 340vh once the stylesheet has landed */
    cy.get('#getaway').should(($el) => {
      expect($el[0].offsetHeight).to.be.greaterThan(1500)
    })
    cy.get('#getaway').then(($el) => {
      cy.scrollTo(0, $el[0].offsetTop + $el[0].offsetHeight / 2)
    })
    cy.get('[role="progressbar"]').should(($bar) => {
      expect(Number($bar.attr('aria-valuenow'))).to.be.greaterThan(10)
    })
  })

  it('pins the getaway frame while the timeline runs', () => {
    cy.get('#getaway').should(($el) => {
      expect($el[0].offsetHeight).to.be.greaterThan(1500)
    })
    cy.get('#getaway').then(($el) => {
      cy.scrollTo(0, $el[0].offsetTop + $el[0].offsetHeight / 2)
    })
    /* guards the regression where overflow-x on <body> silently killed sticky */
    cy.get('#getaway > div').should(($stick) => {
      expect(Math.abs($stick[0].getBoundingClientRect().top)).to.be.lessThan(2)
    })
  })

  it('shows the scene grid', () => {
    cy.get('#turf article').should('have.length', 9)
  })

  it('renders both Netlify forms', () => {
    cy.get('form[name="booking"]').should('be.visible')
    cy.get('form[name="tip-off"]').should('be.visible')
  })

  it('blocks an incomplete booking and reports why', () => {
    cy.get('form[name="booking"]').within(() => {
      cy.get('button[type="submit"]').click()
      cy.get('[role="alert"]').should('exist')
    })
  })
})
