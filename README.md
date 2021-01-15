# ChoreMaster

ChoreMaster is a mobile app, designed in order to gamify the distribution and completion of chores in a household. Just to make doing them a bit more fun!

On opening the app, users will be asked to login or create an account and then create or join a house. If you create a house, other users can type in the house name in order to join and show up in the lobby in real time.
Once all your house members have joined, you will be prompted to list a group of chores which are shared between the household, and then assign them a point value of 1, 2 or 3. The harder the chore, the more points it should get.
Once this is done, users will be redirected to the game screen. Here users will be given a random collection of the chores and some wildcards. Wildcards allow users to swap the chores they have with each other. Each wildcard has a different effect for example the swap wildcard allows you to choose one your chores and swap with a random chore of another players, and the shuffle wildcard will redistribute all the chores.
The game ends when all the users have either pressed done or used all their wildcard. A home screen will then be showed which contains the tasks you had when the game ended. These tasks can then be completed in exchange for points, which can be spent on more wildcards to use in the next game. The game restarts in a weeks time but whilst your waiting feel free to read descriptions of each wildcard in the your wildcards screen, or see how many points your rival players have in the leaderboard.

## Tech-Stack

As our app was working in realtime, and would be refreshing constantly our main aim was to find frameworks that would support this.
We also needed our app to work on mobiles as we needed the users to be looking at their updates together from different views at the same time. 
  
For login, Firebase Authentication was chosen as its secure and users can sign in with a system they already trust. This Saved the project time by not having to develop a more complex method of signing in.

For our front end we went with React Native, as we were designing our project for mobile platforms, we found this to be the best choice, combining javascript and native API development. 
Another noted feature is that react Native creates code that works on both android and ios platforms and comes with a lot of native APIs out of the box, this makes adding native features to the app easy. 

## Front-End

React stack navigation was used as an efficient way to travel backward and forwards through the app. We also imported the Modal library to create stylish pop ups to explain the rules to users without having to send them to another page.  Another noted feature is that it creates code that works on both android and ios platforms and comes with a lot of native APIs out of the box for both iOS and Android, this makes adding native features to the app easy.

To enhance react we included the Expo framework in our front end, this choice was made as with expo,It's easy to use and install on mobile devices and can update in real time which was great for testing the app on the fly.
Finally,in the design phase, we decided we wanted vibrant colours that would inspire people to clean, so a citrus orange background, paired together with a cool complementary blue created the framework for our apps balanced and stylish look.

## Back-End

For the back-end of our tech stack, we had a number of requirements. Due to the multiplayer aspect, we required a realtime database hosted online. We also required a way to implement authorisation for a login process, to allow individual users to be identified, and their data safely stored. 
To meet these requirements, we selected Google’s Cloud Firestore, a cloud-based NoSQL database. Although we considered using our previous experience with PSQL and hosting on Heroku, after spiking out Firestore, we came to the conclusion that it offered more ready made functionalities,such as real-time listeners and authentication through Firebase. 

Firestore is a non-relational database that stores data in Collections of Documents, a format not too dissimilar to JSON. After testing out a few approaches, we came to the schema shown [SHOW DIAGRAM], allowing us to access, set and update data on different users, the houses they are in, the tasks they have been assigned, and the wildcards they own. In addition, Firebase comes with authentication, saving us the time required building that ourselves, and avoiding concerns about data security. 

To access this data, we set up a number of functions that would take user input and write it through an API call. For our realtime data requirements, we were able to monitor the state of the database, and broadcast changes to users when our data met certain criteria. Primarily this was used for monitoring the lobby as users joined a house, and for gameplay to show the effects of other players actions. 





