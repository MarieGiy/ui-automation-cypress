const URL = 'https://www.wizardingworld.com/'
  
const PAGE_TITLE = 'Wizarding World: The Official Home of Harry Potter' 
const SNAPE_NAME = 'Severus Snape'

const SEARCH_BUTTON = 'button.SearchInput_navSearch__3fovm'
const SEARCH_BAR = 'input[type=text]'

const CURATED_PAGE = '.SearchResult_resultWrapper__BHJ-2'
const SNAPE_NAME_CSS = '.CollectionHero_header__3rDGu'
const CURATED_TAB = 'div.Search_desktopLeftCol__22Jfo > ul > ul > li:nth-child(6) > span:nth-child(1)'  

describe('template spec', () => {
  // test example 
  it('passes', () => {
    cy.visit(URL)
    
    // assertions: page title 
    cy.title().should('eq', PAGE_TITLE);

    // Cypres has built-in async func 
    // within 4 sec retries to get the elem
    cy.get(SEARCH_BUTTON).click() 
    
    // [NOTE:]
    // if runs thru Cypress UI (cypress open) web page caches search
    // clean run via npm run script preferable
    cy.get(SEARCH_BAR).type('Severus Snape {enter}')

    cy.get(CURATED_TAB).click()
    
    // hack => forces open new tab in current window, as cypress does't support between windows navigation
    const new_tab = cy.get(CURATED_PAGE, { timeout: 50000 })
    new_tab.invoke('attr','target','_self').click()

    // assertions: Snape name 
    cy.get(SNAPE_NAME_CSS).should('contain', SNAPE_NAME)
  })
})
