# Nonogram

Nonogram is an Instagram clone named after my dog Nono. Nonogram is a social-media platform where users can communicate amongst each other by sharing images, and commenting on them. 

# Live Site

[Nonogram](https://nonogram-jurj.onrender.com/)

## Application Architecture

Nonogram is built on a React frontend with a Flask backend, using PostgreSQL as a database.

## Technologies Used

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

## Nonogram Setup
1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/jameschenn/Nonogram
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run the flask app with the following commands:

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

## Features

### Posts

Users can view and enjoy a feed of posts from all users of Nonogram and, and scroll down and view posts from newest to oldest.

### Comments and Likes

Users also can click on each individual post from the main feed or user's individual profile to an individual page where users can comment and like on that individual post.

![readme image](https://user-images.githubusercontent.com/73676915/169725745-eacde624-43c5-45ac-960c-60c83b0d97c7.PNG)

### Follows

Users also can follow and unfollow each other, and see users they follow, or are followed by in seperate modals.

![readme image 2](https://res.cloudinary.com/jameschenn/image/upload/v1656442995/Nonogram/github_pic_xpopfw.png)

## Future Implementation Ideas

Current WIP: Utilize the private status of Users, and the introduction of web sockets into the app. So users can directly message each other. Please stay tuned! 
