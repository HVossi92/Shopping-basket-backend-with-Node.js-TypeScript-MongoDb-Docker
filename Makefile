prepare:
	yarn install
dev:
	yarn dev
build:
	yarn tsc
docker_build:
	docker build -t hv/hardwarestore:0.0.1 .
	docker tag hv/hardwarestore:0.0.1 hvossi92/shopping-basket-backend-with-node.js-typescript-mongodb-docker:0.0.1
docker_push:
	docker push hvossi92/shopping-basket-backend-with-node.js-typescript-mongodb-docker:0.0.1
