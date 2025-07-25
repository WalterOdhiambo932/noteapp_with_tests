**Notes Web Application Testing Project**
This project demonstrates automated testing for a simple web application consisting of a React frontend and a Node.js backend API.

**Project Overview**
This repository contains:

**Node.js Backend API:** A simple Express.js application providing RESTful endpoints for user authentication and CRUD operations on "items". Data is stored in-memory for simplicity.

**React Frontend:** A basic React application that allows users to log in, view a list of items, add new items, edit existing items, and delete items.

**API Test Automation:** Automated tests for the Node.js backend API using Jest and Supertest.

**Functional UI Automation**: Automated end-to-end (E2E) tests for the React frontend using Cypress and Selenium.


**Test Plan / Test Strategy**
1. What is Being Tested?
**React Frontend (UI):**

User Interface functionality and user flows.

Component rendering and interaction.

Data display and updates based on API responses.

**Node.js Backend API:**

API endpoint functionality (correct responses, status codes).

Data integrity for CRUD operations.

Error handling for invalid requests or non-existent resources.

Authentication mechanism (basic).

2. **Test Coverage Areas**
Functional UI Automation (E2E Tests):

**Login Flow:**

Successful login with valid credentials.

Failed login with invalid credentials.

Failed login with missing username/password (client-side validation).

**Item Management (CRUD):**

Creating a new item and asserting its presence in the list.

Editing an existing item and asserting the updated details.

Deleting an item and asserting its absence from the list.

Asserting validation messages for missing input during creation/editing.

Asserting the initial state (empty list) and post-deletion state.

**API Test Automation:**(19 Tests)

Authentication (POST /login):

Positive: Successful login with valid credentials.

Negative: Failed login with invalid/missing credentials.

Items Retrieval (GET /items, GET /items/:id):

Positive: Fetching all items.

Item Creation (POST /items):

Positive: Successfully creating a new item.

Negative: Attempting to create an item with missing required fields.

Item Update (PUT /items/:id):

Positive: Successfully updating an existing item.

Negative: Attempting to update a non-existent item.

Negative: Attempting to update an item with missing required fields.

Item Deletion (DELETE /items/:id):

Positive: Successfully deleting an existing item.

Negative: Attempting to delete a non-existent item.

3. **Tools Used and Why
Backend:**

Node.js/Express.js: A popular, lightweight, and flexible framework for building APIs.

Jest: A delightful JavaScript testing framework used for unit and integration tests. Chosen for its ease of setup, powerful assertion library, and mocking capabilities.

Supertest: A library for testing HTTP servers, making it easy to send requests to the Express app and assert responses without actually starting the server on a port (though we do start it for E2E consistency).

**Frontend**:

**React**: A widely used JavaScript library for building user interfaces, known for its component-based architecture.

**Vite**: A fast build tool for modern web projects, used for the React app setup.

**Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.

**UI Automation:**
**Robot Framework** is an open-source test and process automation framework used to automate repetitive and manual tasks, such as data input, application navigation, and data processing. It helps IT managers free up professionals from manual tasks and allocate them to more strategic projects

**Cypress**: An all-in-one testing framework for end-to-end testing. Chosen for its developer-friendly API, real-time reloading, automatic waiting, and excellent debugging capabilities in the browser.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------
**Assumptions and Limitations**------------------------------------------------------------------------------------------------------------------------------------



**Simple Authentication:** The backend uses a hardcoded username (user) and password (password) for login validation. There's no real user management or robust token validation.

**In-Memory Data:** The backend stores item data in a simple JavaScript array. This means all data is lost when the backend server restarts. For persistent data, a database (e.g., MongoDB, PostgreSQL) would be required.

**No Authorization:** Beyond basic login, there's no role-based access control or authorization implemented for item operations. Any logged-in user can perform CRUD operations.

**Basic Error Handling**: Error messages are simple and primarily for demonstration.
Single User Focus: The application is designed for a single user interaction for testing purposes; it's not multi-user aware beyond the basic login.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------
"WALTER NOTES APP" INSTALLATION"-----------------------------------------------------------------------------------------------------------------------------------


a) SERVER SIDE(BACKEND)
-clone the repository
-install node and npm
-open folder for walter_notes_app-backend
-open the server in an IDE like Vscode
-run on terminal on the directory of the file using "node server.js"
-the server will start running on "http://localhost:3001"


b)FRONT END
-extract folder for walter_notes_app_frontend
-open the file on a IDE
-go to Inside directory in the terminal where the index.js is.
-run command "npm run dev"
-access the page on url " http://localhost:5173/"

--------------------------------------------------------
c) SELENIUM TESTS
-install robotframework and its packages
-open extracted folder for remwaste_selenium_robot_ui_tests
-open the rem_tests.robot
-change the driver path indicated under variables to match with your path where Edge/Chrome browser is located
-go on terminal of the directory
-type robot rem_tests.robot then enter.
-you should see the tests running while opening browser
-check report under report.html inside the test folder

----------------------------------------------
D) API Tests with supertest
- install supertest with command as "npm install --save-dev jest"
- Install the reporter package as "npm install --save-dev jest-html-reporters"
-Configure Jest to use the reporter:You'll need to create a jest.config.js file in your project root if you don't already have one
-on the supertest folder make sure you edit the package.json if not yet edited to below
{
  "name": "walter_notes_app_backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "jest"            
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "jest": "^<latest-jest-version>" 
  }
}

------
-jest.config.js
--


module.exports = {
  testEnvironment: 'node',

  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: './junit-report', 
      outputName: 'junit.xml',          
      ancestorSeparator: ' › ',           
      addFileAttribute: 'true',         
    }],
    ['jest-html-reporters', {
      publicPath: './html-report',
      filename: 'report.html',
      expand: true,
      openReport: false 
    }]
  ]

  
};

open the html report after running the tests to see the report.








