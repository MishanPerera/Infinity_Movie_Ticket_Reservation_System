# Infinity_Movie_Ticket_Reservation_System
 
 INSTALLATION STEPS

1.Open the folder using VS code
	-there should be 2 folders inside called Movie Zone, MovieServices

2.Open 5 terminals and go inside Movie Zone folders separately using each terminal 
	1.	command > cd Movie Zone/Backend/Service_1
	2.	command > Movie Zone/Backend/Service_2
	3.	command > Movie Zone/Backend/Service_3
	4. 	command > Movie Zone/Backend/Service_4
	5.	command > Movie Zone/Frontend
		
3.In each terminal type following command respectively to install node modules
	command - npm install

4.Open  your WSO2 integration studio 

5.Import the project folder (MovieServices) 

6.Open Windows => Show view => Other => Servers

7.Create a new server according to the labsheet

8.Select WSO2 enterprise integrator 6.6.0 and set the carbon Home and click ‘Next’

9.Add project as configured

10.Finish creating the server

11.Right click on the newly created server and click start

12.Log into the WSO2 management console providing username and password both as ‘admin’

13.Click on the  API’s and copy the path without the context (Ex: http://192.168.8.183:8290)

14.Open the VS Code and open web => src => utils => hostAddress.js and paste the above copied ip address and assign it to the constant variable called ‘ip’ 

15.Then type following command in the terminals opened in the step 2
			Command - npm start

16.Then you should see both Rest-service and web up and running. 

17.Open the chrome browser and type “ http://localhost:3000/ “ , you should see the landing page of Movie Zone
