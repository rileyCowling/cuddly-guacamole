///////////////////////////////////////////////
    Loggin into EC2 Instance from Terminal
///////////////////////////////////////////////

//Run the following commands to log onto our EC2 instance
// I think you can copy the key and just make sure you are located in the right directory

$ chmod 400 513_project_key.pem

$ ssh -i "513_project_key.pem" ec2-user@ec2-13-57-240-26.us-west-1.compute.amazonaws.com

//Navigate to application and run app

$ cd cuddly-guacamole/server/app/

$ node app.js

//Visit the app by going to IP or DNS at port 3000

http://13.57.240.26:3000

or

http://ec2-13-57-240-26.us-west-1.compute.amazonaws.com:3000




//////////////////
      Git Hub
//////////////////

//Updating to the latest version in repository

$ ssh -i "513_project_key.pem" ec2-user@ec2-13-57-240-26.us-west-1.compute.amazonaws.com

$ cd cuddly-guacamole/      //need to be inside of the git repo

$ git pull                  //this updates from the online repo
//we shouldn't have to work on the code in the EC2 instance so we won't be pushing from there

//Usefull git commands

$ git status //tells you if you're working with an up to date project
