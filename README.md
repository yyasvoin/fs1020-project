Computer Store
Description: FS1020 project –
Online Computer Store with authentication Users have the ability to make
an account, add, edit and delete products (computers).
Every computer has following properties:

id
name
price
brand
description
quantity
availability

Used: HTML, CSS, Bootstrap, Node, Express
Part One

Create a git repository and host it on GitLab or another git hosting service. Invite your teacher to it
Initialize a Node package using npm a. Give it an appropriate “name” field b. Add yourself as the author
Install and use the nodemon as a developer dependency in your npm start script to run src/index.js
In your application code setup an HTTP server with Express listening to a port equal or higher to 1024 in src/index.js
All routes should be defined in src/router.js and be added into the main app as express.Router() middleware and accept JSON in request bodies
Define the following routes and have them respond with a 200 status code and use semantically correct HTTP verbs: a. /register: Takes a username and password as an argument and adds an entry to the JSON password. All passwords should be hashed with a cryptographically secure hashing algorithm. b. /login: Sets the user’s session to be logged in as a specific username should they provide the correct credentials c. /product: You may use a more specific name for your endpoint. Must have 5 endpoints defined: i. Getting a list of all products filterable by name ii. Getting products by ID iii. Creating products iv. Updating products by ID v. Deleting products by ID

Part Two

Install a templating system such as Handlebars.js or EJS and set it as your view engine.
Implement the JSON API endpoint to create a product and have it persist using Node’s fs module to modify the contents of a JSON file
Implement the JSON API endpoint to get a list of all products using Node’s fs module to read the contents of the JSON file that you’re persisting newly created items in
Implement the JSON API endpoint to get a product by ID using Node’s fs module to read the contents of the JSON file you’re using for persistent storage
On the root route (simply a forward slash) render a template that meets the following criteria: a. Render a valid HTML5 document b. Must serve a Bootstrap’s full CSS served from the Express HTTP server locally c. Render a table using Bootstrap’s default table styling that displays a list of all products

Part Three

Implement the JSON API endpoint to delete a product by ID using Node’s fs module to read the contents of the JSON file you’re using for persistent storage
Implement the JSON API endpoint to update a product by ID using Node’s fs module to read the contents of the JSON file you’re using for persistent storage
Implement the JSON API endpoint to register a user: a. Must take a username and password b. Securely store the user’s password using a cryptographically secure hashing algorithm in a JSON file for persistent storage
Implement the JSON API endpoint to log a user in: a. Must take a username and password b. Store session IDs securely in HTTP only cookies
Protect all routes, pages, and static assets with the exception of /login and /register, behind authentication so only authenticated users may access them.