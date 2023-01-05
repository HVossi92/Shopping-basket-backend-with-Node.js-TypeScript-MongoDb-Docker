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
    - The shopping basket should be persistent (saved to a DB), in case the user closes the page and comes back later
   
 #### Tasks
 - Setup the basic project structure and dependencies
 - Create controller with endpoints
 - Run a MongoDb docker image
- Add all requests to Postman
- Build a docker image out of the backend, run it & test it via Postman

#### MongoDb

- Run a docker container of mongoDb:
    - docker run -d -p 27017:27017 --name=mongodb-hardware-store mongo:latest
- Check that its running with 'docker ps' or using the docker desktop app

#### Node.js backend

- The app can be started in a development environtment with 'make dev'/'yarn dev' or in docker.

- Pull from docker hub: 
    - docker pull hvossi92/shopping-basket-backend-with-node.js-typescript-mongodb-docker:0.0.1
- Run the dockerized app:
    - docker run -p 3000:3000 --restart always --name hardwarestore hvossi92/shopping-basket-backend-with-node.js-typescript-mongodb-docker:0.0.1

- Create a new docker image of this app:
    - docker build -t hv/hardwarestore:0.0.1 .
- Tag docker image:
    - docker tag hv/hardwarestore:0.0.1 hvossi92/shopping-basket-backend-with-node.js-typescript-mongodb-docker:0.0.1

