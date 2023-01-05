# Shopping-basket-backend-with-Node.js-TypeScript-MongoDb-Docker
This is a small repository showcasing how to build a shopping basket backend in Node.js, using TypeScript, MongoDb and Docker. It will provide a simple API, which can be used e.g. via Postman to modify the basket.

## Assignment
The assignment is to implement one ticket of a sprint. As part of a hardware store's new website a micro service is required to allow online shoppers to modify their shopping basket (adding & removing items). The UI will be created by the front-end team, all they need is a backend service with an easy to use API and documentation.

#### Ticket
- Add existing items into a shopping basket
    - If number of items > number of stocked items decline
    - If number of items < number of stocked items accept and update dbo with the minimum required amount (e.g. 25 nails, instead of only 1)
    - If an item of the same type is already present inside the shopping basket, just increment the number (if possible)
- Retrieve shopping basket via ID
    - Show all items (type, count, price)
    - Show the totalled price of all items
- Deletion
    - Delete one item of basket
    - Clear entire shopping basket
- Persistence
    - The shopping basket should be persistent (saved to a DB), in case the user closees the page and comes back later
   
 #### Tasks
 - Setup the basic project structure and dependencies
 - Create controller with endpoints
 - Create Unit tests to validate all the ticket#s requirements
 - Provide a MongoDb docker image
 - Create a service to pass the unit (acceptance) tests
     - Implement the business logic
     - Implement the database logic
- Create a swagger file for the API documentation
- Add all requests to Postman
- Build a docker image out of the backend, run it & test it via Postman
