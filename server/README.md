# handshake serve

## how to start
- create .env to store configuration data
  - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
- install independencies using `yarn`
- DB initialization:
  - run `yarn run knex migrate:latest`(only run this for the first time)， mysql will create tables based on `db/migrations`
  - run `yarn run knex seed:run`, pupulate data based on `db/seeds`
- run `yarn run dev` to start program with `nodemon`
  - Using vsc to inspect code with attach debugging mode

## database design
- [dbdiagram.io](https://dbdiagram.io/home)

## VSC plugins
- prettier
- eslint
- SQLTools - Database tools
- TODO Hightlight
- vscode-dbml
- dotenv

## Debugging

- create a launch.json file
- add configuration using attach
- `yarn run dev` with `--inspect` on port 9229
- run vsc debugger to attach to port 9229
- with nodemon restart， attach will restart also


## New bugs
- post withRelated:['profileBasic] --> no column called profileBasic
- put, the operation is successful, but the res data is old
  - using await, res gives the new data


## Environment issue
- The migration directory is corrupt, the following files are missing: 20200227182458_users.js, 20200229013702_profile.js
    - knex was referencing old files which were deleted manually
    - In order to let knex to reference new files, delete old references - they are rows in knex_migrations

- Error: Cannot find module './routes'
  - I separated routers with different files, but forgot to provide an index.js file for router

- Loading dotenv inccorrectly
  - dotenv lives in the root folder

- Don't forget to send request with token


- 1. Display complete profile of a student (basic details, career objective, education, experience, skillset, profile picture)

GET /api/profile/:id  -- :id --> user_id 
    RES: basic, education, experience --> FRONT
front router /user/profile   --> profile page connects to redux store to get states (user_id, etc)
<!-- res.basic.name = ;;';''

res.experience.map(()=> {

}) -->

2. Upload profile picture
3. Update basic details (name, date of birth, city, state, country) and Career Objective

4. Update Education Details (College name, Location, Degree, Major, Year of passing, current
CGPA)
5. Update Experience details (Company name, Title, Location, Start & End dates, Work description)
6. Update Contact Information (email id, phone number)
7. Update Skillset information



# Questions:

query to get 

GET, DELETE AND PUT job: only passed in job id
POST job: pass in company user id

resume upload

avatar

event eligibility

search filter

PUT job: need to know user id
location = ""

query = title + category
select ....
from ....
where  tile == ... and category ....

## 