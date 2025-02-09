/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
   beforeEach(function() {
    cy.visit('./src/index.html')  

    })
    it('verifica o título da aplicação', function() {
     cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os capos obrigatorios e envia o formulario',function(){
        const longText = 'Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,'
        
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Fragnan')
        cy.get('#email').type('leonardo@yahoo.com.br')
        cy.get('#open-text-area').type(longText,{delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Leonardo')  
        cy.get('#lastName').type('Fragnan')
        cy.get('#email').type('leonardo@yahoo,com.br')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
})

    it('campo de telefone continua vaziu caso telefone nao seja numero', function(){

        cy.get('#phone')
          .type('abcdefghij')
          .should('have.value','')
    })

    it('exibe msg de erro quando campo de tel se torna obrigatorio e nao e preenchido', function(){
        cy.get('#firstName').type('Leonardo')  
        cy.get('#lastName').type('Fragnan')
        cy.get('#email').type('leonardo@yahoo.com.br')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){

        cy.get('#firstName')
          .type('Leonardo') 
          .should('have.value','Leonardo')
          .clear()
          .should('have.value','')
        cy.get('#lastName')
          .type('Fragnan') 
          .should('have.value','Fragnan')
          .clear()
          .should('have.value','')
        cy.get('#email')
          .type('leonardo@yahoo.com.br') 
          .should('have.value','leonardo@yahoo.com.br')
          .clear()
          .should('have.value','')
          cy.get('#phone')
          .type('1234567890') 
          .should('have.value','1234567890')
          .clear()
          .should('have.value','')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', function(){

        cy.contains('button', 'Enviar')
          .click()
        cy.get('.error')
          .should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){

        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto',function(){

        cy.get('#product')
        .select('YouTube')
        .should('be.visible')
    })
    
    it('seleciona um produto (Mentoria) por seu (value)',function(){
        
        cy.get('#product')
          .select('mentoria')
          .should('have.value', 'mentoria')
          .should('be.visible')
    })

    it('seleciona um produto (Blog) por seu (indice)',function(){
        
        cy.get('#product')
          .select(1)
          .should('have.value', 'blog')
          .should('be.visible')
    })

    it('marca o tipo de atendimento "Feedback"', function(){

        cy.get('input[type="radio"][value="feedback"]')
          .check()
          .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function(){

        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
          })
        })
        
    it('marca ambos checkboxes, depois desmarca o último', function(){

      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
         })

         it(' seleciona um arquivo da pasta fixtures', function(){

          cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input) {
              expect($input[0].files[0].name).to.equal('example.json')
            })
         })

         it('seleciona um arquivo simulando um drag-and-drop', function(){
          cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input) {
              expect($input[0].files[0].name).to.equal('example.json')

         })
        })
        
        it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',function(){
        
          cy.fixture('example.json').as('sampleFile')
          cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input) {
              expect($input[0].files[0].name).to.equal('example.json')

        })
      })

      it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a')
          .should('have.attr','target','_blank')

      })

      it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){

        cy.get('#privacy a')
          .invoke('removeAttr','target')
          .click()
          cy.contains('Talking About Testing')
            .should('be.visible')
      })
})