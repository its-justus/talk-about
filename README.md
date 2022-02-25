![REPO SIZE](https://img.shields.io/github/repo-size/its-justus/talk-about.svg?style=flat-square)
![TOP_LANGUAGE](https://img.shields.io/github/languages/top/its-justus/talk-about.svg?style=flat-square)

# TalkAbout

## Description

_Duration: 2 Week Sprint_

TalkAbout is a real time chat app aimed at making it easy to find others interesting it chatting about the same topics you are. Chat rooms are kept small to keep conversations intimate.

## Screen Shots

![Login page](/documentation/images/login.png)
![Main page](/documentation/images/mainpage.png)

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Express.js](https://expressjs.com/)

## Installation

Before starting installation ensure that all prereqs are installed and working. You need to have a PostgreSQL database created and running in order to continue

1. Create a database named `talkabout`.
2. The queries in the `database.sql` file are set up to create all the necessary tables. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. Use your client of choice to run the queries. 
3. Open your editor of choice and create a .env file with the following values:
	```
	SERVER_SESSION_SECRET=[put a sufficiently random and long string here]
	MAX_HISTORY_MESSAGES=20
	MAX_POPULAR_TOPICS=10
	MAX_MEMBER_COUNT=7
	```
	The max counts are optional and allow basic configuration of the server.
4. Run an `npm install` in your terminal in the root of the project folder.
5. Run `npm run server` in your terminal.
6. Run `npm run client` in your terminal.
7. The `npm run client` command should open a browser window for you, but if it does not just open your browser and navigate to http://localhost:3000. Chrome is the only browser that is currently supported.

## Usage

1. A. Register by pressing the register button to enter a username and password. This will automatically log you in.
1. B. If you have an account created already, just enter your username and password and click sign in.
2. On the main page you can join a room by entering the topic you want to talk about and pressing enter.
3. You can also join a room by clicking on one of the popular topics in the popular topics section. You can refresh these topics by clicking the refresh button next to the heading "Popular Topics".
4. You can pull up an of the rooms you are currently in by clicking the room in the "My Rooms" section.
5. Once in a room, simply click in the input field at the bottom and type. Pressing enter will send your message. Pressing shift enter allows you to put a new line in the input field without sending the message, though this doesn't currently show up correctly once sent.
6. You can edit any of the messages you have sent by clicking the edit button (the pencil looking icon) on the right side of the message. Make your changes to the message in the text field, and then click the save button, or cancel to discard your changes.
7. You can delete any message you have sent by clicking the trash can button on the right side of the message. Be wary, this is permanent and cannot be undone.


## Built With

* React
* Redux + Sagas
* Socket.io
* PostgreSQL
* Material-UI
* Passport
* Express
* Node
* bcryptjs

## Acknowledgement
Thanks to [Emerging Digital Academy](www.emergingacademy.org) who equipped and helped me to make this application a reality. Also, shout out to [Jake Schaffer](https://github.com/JakeCr8Guru) for helping me out with styling.  

## Support
If you have suggestions or issues, please email me at [ianjohnson9042@gmail.com](ianjohnson9042@gmail.com)

## Thanks!

Thanks for reading! I hope you have a great day!
