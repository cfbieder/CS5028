# Welcome to My Project

Please find below the steps to run this projct


# Start Docker MongoDB

## Enter:
	docker compose up -d
### This will start the database that the project will need

# Run to Program
## Note: Nodejs/NPM need to be installed on the machine to run
### See https://nodejs.org/en/download if installation is required

## Command available to start the project
		npm run mock # will run the project using testing mock data
		npm run live # will perform a RSS request to get latest data

##  Once up and running and data is obtained a GET request can be made to retrieve what is stored in the MongoDB database