import products from '../fixtures/product-config.json'

const totalProducts = products.length
let filteredTags
let clickedTag

before(() => {
  const filteredTagsSet = new Set()

  products.forEach(product => product.tags.forEach(tag => {
    filteredTagsSet.add(tag)
  }))

  filteredTags = Array.from(filteredTagsSet)
  clickedTag = filteredTags[Math.floor(Math.random() * filteredTags.length)]

  cy.visit('/')
})

describe('Tags', () => {
  it('should all exist', () => {
    filteredTags.forEach(tag => {
      cy.get(`[title="${tag}"]`).should('exist')
    })
  })

  it('should display all products if no filter is in place', () => {
    products.forEach(product => {
      cy.contains(product.name)
    })
  })

  it('should display products based on selected tags', () => {
    cy.get(`[title="${clickedTag}"]`).click()

    cy.get('.product-list').children().then(products => {
      let childrenLength = products.length

      for(let i = 0; i < childrenLength; i++) {
        cy.get(products[i]).contains(clickedTag)
      }
    })
  })

  it('should highlight user selected tag for searching', () => {
    cy.get(`[title="${clickedTag}"]`).should('have.attr', 'class', 'tag-list-tag-clicked')
  })
})

describe('Product', () => {
  it('should have an image', () => {
    cy.get('[title="all"]').click()
    
    for(let i = 1; i < totalProducts + 1; i++) {
      cy.get(`.product-list > :nth-child(${i})`).find('img').should('be.visible')
    }
  })

  it('should have a product name', () => {    
    for(let i = 1; i < totalProducts + 1; i++) {
      cy.get(`.product-list > :nth-child(${i})`).find('h5').should('be.visible')
    }
  })

  it('should have a product description', () => {    
    for(let i = 1; i < totalProducts + 1; i++) {
      cy.get(`.product-list > :nth-child(${i}) > .description`).should('be.visible')
    }
  })

  it('should have a metadata tag', () => {    
    for(let i = 1; i < totalProducts + 1; i++) {
      cy.get(`.product-list > :nth-child(${i}) > .product-tag-container`).should('be.visible')
    }
  })
})