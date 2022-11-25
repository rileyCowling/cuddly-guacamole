# cuddly-guacamole
ECE 513 IOT group project. Uses a Particle Photon IOT microcontroller and the MAX30102 heart beat and blood oxygen sensor.

## Important ##
Use the README's to in the different folders if you don't know what to do.
the one inside of server talks about getting ec2 going on your computer

## TO-DO ##
# Website/application
    -set up routes 
    -need a place for webhooks to go
    -then graphically display the data 

# Particle
    -set up webhooks
    -adapt the code to have different states - use some variable i guess that can be adjusted by user. 



## Structure ##

Inside of Firmware is where we have the files relating the the particle photon device.

Inside of Server is where we have all of the files relating to the EC2 instance along with files relating to the node.js and express.js server/application along with all of our web resources that are employed by the application. 
