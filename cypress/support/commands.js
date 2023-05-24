Cypress.Commands.add('fillMandatoryFieldsAndSubmit',function(){
    cy.get('#firstName').type('Leonardo')  
    cy.get('#lastName').type('Fragnan')
    cy.get('#email').type('leonardo@yahoo.com.br')
    cy.get('#phone-checkbox').type('1234567890')
      .click()
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()
})
