describe('Note Management App UI Tests', () => {

    const APP_URL = 'http://localhost:5173';

    const API_URL = 'http://localhost:3001';

    beforeEach(() => {
        cy.visit(APP_URL);
        cy.window().then((win) => {
            win.localStorage.clear();
        });
        
        cy.request('DELETE', `${API_URL}/items/reset-for-tests`).then(() => {
       
        });
    });

  
    const login = (username = 'testuser', password = 'testpass') => {
        cy.get('#username').type(username);
        cy.get('#password').type(password);
        cy.get('button[type="submit"]').contains('Login').click();
        cy.contains('Login successful!').should('be.visible');
        cy.url().should('eq', APP_URL + '/');
    };

    // --- Login Scenarios ---

    it('should allow a user to log in with valid credentials', () => {
        login();
        cy.contains('Welcome!').should('be.visible');
        cy.get('button').contains('Logout').should('be.visible');
        cy.contains('Your Notes').should('be.visible');
    });

    it('should prevent login with invalid credentials', () => {
        login('wronguser', 'wrongpass');
        cy.contains('Invalid credentials').should('be.visible');
        cy.contains('Welcome!').should('not.exist');
        cy.get('button').contains('Logout').should('not.exist');
    });

    // --- CRUD Scenarios (requires login) ---

    it('should allow creating a new note', () => {
        login();

        const newNoteTitle = 'My New Test Note';
        const newNoteContent = 'This is the content for the test note.';

        cy.get('#noteTitle').type(newNoteTitle);
        cy.get('#noteContent').type(newNoteContent);
        cy.get('button').contains('Add Note').click();

        cy.contains('Note added successfully!').should('be.visible');
        cy.contains(newNoteTitle).should('be.visible');
        cy.contains(newNoteContent).should('be.visible');

        
        cy.get('#noteTitle').should('have.value', '');
        cy.get('#noteContent').should('have.value', '');
    });

    it('should allow editing an existing note', () => {
        login();


        const originalTitle = 'Note to Edit';
        const originalContent = 'Original content here.';
        cy.get('#noteTitle').type(originalTitle);
        cy.get('#noteContent').type(originalContent);
        cy.get('button').contains('Add Note').click();
        cy.contains(originalTitle).should('be.visible');

        const updatedTitle = 'Edited Test Note Title';
        const updatedContent = 'Updated content for the test note.';

       
        cy.contains(originalTitle).parent().parent().find('button').contains('Edit').click();

      
        cy.get('#noteTitle').should('have.value', originalTitle);
        cy.get('#noteContent').should('have.value', originalContent);
        cy.get('button').contains('Cancel').should('be.visible'); 

       
        cy.get('#noteTitle').clear().type(updatedTitle);
        cy.get('#noteContent').clear().type(updatedContent);
        cy.get('button').contains('Update Note').click();

        cy.contains('Note updated successfully!').should('be.visible');
        cy.contains(updatedTitle).should('be.visible');
        cy.contains(updatedContent).should('be.visible');
        cy.contains(originalTitle).should('not.exist'); // Original title should no longer be visible
    });

    it('should allow deleting an existing note', () => {
        login();

        const noteToDeleteTitle = 'Note to Delete';
        const noteToDeleteContent = 'This note will be deleted.';
        cy.get('#noteTitle').type(noteToDeleteTitle);
        cy.get('#noteContent').type(noteToDeleteContent);
        cy.get('button').contains('Add Note').click();
        cy.contains(noteToDeleteTitle).should('be.visible');

        
        cy.contains(noteToDeleteTitle).parent().parent().find('button').contains('Delete').click();

        cy.contains('Note deleted successfully!').should('be.visible');
        cy.contains(noteToDeleteTitle).should('not.exist');
    });

    it('should display "No notes yet" when all notes are deleted', () => {
        login();

        // Add a note
        cy.get('#noteTitle').type('Temp Note');
        cy.get('#noteContent').type('Content');
        cy.get('button').contains('Add Note').click();
        cy.contains('Temp Note').should('be.visible');

        // Delete the note
        cy.contains('Temp Note').parent().parent().find('button').contains('Delete').click();
        cy.contains('Note deleted successfully!').should('be.visible');

        // Assert "No notes yet" message is visible
        cy.contains('No notes yet. Add one above!').should('be.visible');
    });
});