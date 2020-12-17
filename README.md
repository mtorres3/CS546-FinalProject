# CS546-FinalProject
Github Repo: https://github.com/mtorres3/CS546-FinalProject

To set-up our project:
- navigate to our Github project repo
- clone the repo onto your local machine
- open terminal and navigate to the project clone
- run the attached seed.js file to seed the database with "npm run seed"
- run "npm start"
- you should now succesfully see the GamerWorld Dashboard on http://localhost:3000/

To use our project:
- When first opening the page, you will first be able to see the navigation bar up top. It has the pages "Dashboard", "Trending", "Reviews" and "Login"
- On the first page, you will also be able to view Dashboard. This is a browsing page which displays the artworks for all of the games that are in our database.
- From the dashboard, you will be able to click on any of the images. This will lead you to a detailed page of each individual game. Here you will see the game name, artwork, genre, any platforms this game could be played on and the description of the game. When logged in, on this page you will also be able to click and "favorite" any game. These games will then be displayed under the "profile" tab. Note: the favorite button will only be displayed when logged in.
- The next tab displayed on the nav bar will be the "Trending" page. Each user on our website has the ability to post a review and have other users like/dislike it. The Trending page displays the most liked reviews in the database from top to bottom.
- The next tab is the "Reviews" tab. When clicking on this, you will see all of the reviews displayed in our database. You can click on any of the reviews to be directed to a page displaying that single review. Here, you will also be able to see our comment section. Note: Anyone can view the comments, however to post a comment you will only see the "post" form if you are logged in as a user.
- The final tab on the nav bar is "Login". This will prompt you to a Login form with a username and password. For demo purposes, we have created a dummy account with the username "helloKitty" and the password "cat". Once typed in and pressed "Submit" your console will log a "Logged in successfully" message. And you will be redirected to a new "Profile" page on the nav bar.
- The "Profile" page will have the user name, bio, favorite games and any reviews the user posted. There is also an "edit proile" button. Here the user will be able to change their "Display Name" and "Bio".
- As a logged in user, you can now navigate back to the "Reviews" page and click on the "Create Review" button at the top. This will lead you to a input form which will allow you to post a review to our database.
- Additionally, as a logged in user you can click on any review in the "Reviews" page and find the "New Comment" form. This will post comments to the database for that review.
- Finally, the nav bar displays a "Logout" button. Once logged out, the user will be redirected to the dashboard and have the ability to Login again.
