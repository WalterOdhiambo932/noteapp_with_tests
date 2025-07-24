**Web Application Testing Project**
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

**API Test Automation:**

Authentication (POST /login):

Positive: Successful login with valid credentials.

Negative: Failed login with invalid/missing credentials.

Items Retrieval (GET /items, GET /items/:id):

Positive: Fetching all items.

Positive: Fetching a specific item by ID.

Negative: Attempting to fetch a non-existent item.

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
