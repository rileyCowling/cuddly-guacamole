# cuddly-guacamole
ECE 513 IOT group project. Uses a Particle Photon IOT microcontroller and the MAX30102 heart beat and blood oxygen sensor.


## LINKS & Important INFO ##

Link to server: https://ec2-13-57-240-26.us-west-1.compute.amazonaws.com:3000/index.html

Link to pitch: https://youtu.be/TdQyBunSb_0

Link to project video: https://youtube.com/playlist?list=PLqu2Z1-kOANMk8LBFq06qJZPbs_TBgQzE

Login Credentials for Patient: patient@email.com, Patient1!!

Login Credentials for Physician: physician@email.com, Physician1!!



## Overview of Project ##
- ECE 513 IOT group project. Uses a Particle Photon IOT microcontroller and the MAX30102 heart beat and blood oxygen sensor.
- Collects data from the sensor, uploads it to a database and is displayable in the corresponding account using Chart.js

Group Members
- Riley Cowling
- Ryan Stancliffe
- Brad Zimmermann

## How to run the project ##
/////////////////////////////////////////////// Loggin into EC2 Instance from Terminal ///////////////////////////////////////////////

//Run the following commands to log onto our EC2 instance //copy/download key to your computer and make sure you are located in the right directory

$ chmod 400 513_project_key.pem

$ ssh -i "513_project_key.pem" ec2-user@ec2-13-57-240-26.us-west-1.compute.amazonaws.com

//Navigate to application and run app

$ cd cuddly-guacamole/server/app/

$ node app.js

//Visit the app by going to IP or DNS at port 3000

//Non-HTTPS links

http://13.57.240.26:3000

or

http://ec2-13-57-240-26.us-west-1.compute.amazonaws.com:3000


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
    - patients: Patients handles all requests that involve querying the patient database.
    - physicians: physicians handls all requests that involve the physician database, substantially less than patients.
 

