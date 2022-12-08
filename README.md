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


## Remove above and other README files before turning in ##

Link to server: 
Link to pitch: 
Link to project video: 

Login Credentials for Patient: 
Login Credentials for Physician: 



Overview of Project
- ECE 513 IOT group project. Uses a Particle Photon IOT microcontroller and the MAX30102 heart beat and blood oxygen sensor.
- Collects data from the sensor, uploads it to a database and is displayable in the corresponding account using Chart.js

Group Members
- Riley Cowling
- Ryan Stancliffe
- Brad Zimmermann

How to run the project
- 

Structure
- firmware  - all files relating to the particle photon device
- server    - all files relating to the EC2 instance, node.js, and express.js server
            - all web resources employed by the application

Brief description of each (non css, non self explanatory) file
- account.html      - HTML code to have the page look like it does. This includes the navigation bar and links, three fillable fields, five drop down select fields, five buttons, and two script tags. The script tags are for creating a dropdown that updates with every added physician account, and for displaying the two charts respectively.
- index.html        - HTML code to have the page look like it does. This includes the navigation bar and links, a section for a description of the project, and a section for the members of our team. In the team member section, each of us has a picture, name, and email address which can be clicked to send an email to us.
- login.html        - HTML code to have the page look like it does. This includes the navigation bar and links, two fillable fields, one drop down select field, and one button.
- physician.html    - HTML code to have the page look like it does. This includes the navigation bar and links, and the dynamically sized table with two script tags. The first script tag is for creating the table (and updating the pages css) based on the number of patients the physician has, and the second is for displaying the two charts at the bottom of the table.
- reference.html    - HTML code to have the page look like it does. This includes the navigation bar and links, and a list of the third party APIs, libraries, and sources we used.
- signup.html       - HTML code to have the page look like it does. This includes the navigation bar and links, two fillable fields, one drop down select field, and one button.
- javascripts
    - account.js    - 
    - login.js      - Various checks that need to be made when the login button is clicked. This includes checking the email and password fields are not empty, and checking if the account information exists in the patient or physician account databases via POST requests.
    - physician.js  - 
    - script.js     - A simple scroll function used to fade the navigation bar in or out when the window is moved 40px from the top of the page.
    - signup.js     - Various checks that need to be made when the signup button is clicked. This includes checking that the email and password fields are not empty, checking that the email address is valid, checking that the password is ‘Strong’, checking that the entered email does not already have an account, and finally making a new patient or physician account using the entered information via POST requests.
- routes
    - index         - 
    - patients      - 
    - physicians    - 
    - users         - 

