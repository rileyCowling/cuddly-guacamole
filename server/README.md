///////////////////////////////////////////////
    Loggin into EC2 Instance from Terminal
///////////////////////////////////////////////

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

$ cd cuddly-guacamole/

$ git pull


