# MEALS

_This API manages restaurant information about users, meals, orders and reviews, performs the actions of deleting, creating, modifying and consulting all the information that is managed._

##INSTALLED LIBRARIES OR TOOLS

##### NOTE: _Before running the tools and libraries, clone the project that is in the following path ---> https://github.com/castilloxavie/appi-motorcycles, keep in mind to clone the env.temolate file and rename it .env and add the variables of environment_

sh
npm init -y
npm i express
npm i -D nodemon
docker-compose up -d
npm i env-var
npm i dotenv
npm i sequelize
npm i pg pg-hstore
npm i zod
npm i morgan
npm i cors
npm i bcrypt
npm i jsonwebtoken
npm run dev

### Endpoints: Users, Meals, Orders, Restaurants, Reviews

#### Users

| HTTP   | URL                                         | DESCRIPTION                      |
| ------ | ------------------------------------------- | -------------------------------- |
| GET    | http://localhost:3000/api/v1/user/orders/   | consultation of all orders       |
| GET    | http://localhost:3000/api/v1/user/orders/id | query by id                      |
| POST   | http://localhost:3000/api/v1/user/          | Create order                     |
| POST   | http://localhost:3000/api/v1/user/          | User register                    |
| DELETE | http://localhost:3000/api/v1/user/id        | Delete user (user status change) |
| PATCH  | http://localhost:3000/api/v1/user/id        | Update user                      |

#### Order

| HTTP   | URL                                   | DESCRIPTION                        |
| ------ | ------------------------------------- | ---------------------------------- |
| GET    | http://localhost:3000/api/v1/order/   | consultation all orders            |
| GET    | http://localhost:3000/api/v1/order/id | query by id                        |
| POST   | http://localhost:3000/api/v1/order/   | Createorder                        |
| PATCH  | http://localhost:3000/api/v1/order/   | update order                       |
| DELETE | http://localhost:3000/api/v1/order/id | Delete order (order status change) |

#### Restaurant

| HTTP   | URL                                        | DESCRIPTION                                  |
| ------ | ------------------------------------------ | -------------------------------------------- |
| GET    | http://localhost:3000/api/v1/restaurant/   | consultation all restaurants                 |
| GET    | http://localhost:3000/api/v1/restaurant/id | query by id                                  |
| POST   | http://localhost:3000/api/v1/restaurant/   | Create restaurant                            |
| PATCH  | http://localhost:3000/api/v1/restaurant/   | update restaurant                            |
| DELETE | http://localhost:3000/api/v1/restaurant/id | Delete restaurant (restaurant status change) |

#### Meals

| HTTP   | URL                                  | DESCRIPTION                      |
| ------ | ------------------------------------ | -------------------------------- |
| GET    | http://localhost:3000/api/v1/meal/   | consultation all meals           |
| GET    | http://localhost:3000/api/v1/meal/id | query by id                      |
| POST   | http://localhost:3000/api/v1/meal/   | Create meal                      |
| PATCH  | http://localhost:3000/api/v1/meal/   | update meal                      |
| DELETE | http://localhost:3000/api/v1/meal/id | Delete meal (meal status change) |

#### Meals

| HTTP   | URL                                    | DESCRIPTION                          |
| ------ | -------------------------------------- | ------------------------------------ |
| GET    | http://localhost:3000/api/v1/review/   | consultation all reviews             |
| GET    | http://localhost:3000/api/v1/review/id | query by id                          |
| POST   | http://localhost:3000/api/v1/review/   | Create review                        |
| PATCH  | http://localhost:3000/api/v1/review/   | update review                        |
| DELETE | http://localhost:3000/api/v1/review/id | Delete review (review status change) |
