# Chat App Overview

This repository contains the source code for a chat application built using Express.js, MongoDB, and Socket.io. The app allows users to communicate in real-time through chat rooms, sending and receiving messages.

## Features

- User authentication using JWT tokens.
- Ability to join and create chat rooms.
- Real-time messaging with Socket.io.
- Secure token-based authentication for API endpoints.
- MongoDB for storing user data, chats, and messages.

## Prerequisites

Before you begin, ensure you have the following dependencies installed:

- Node.js
- npm
- MongoDB

## Installation

1. Clone this repository:
```
git clone https://github.com/katiyarkartik0/chat-app.git
```
2. Install dependencies:
```
cd chat-app
npm install
```
3. Create a .env file and set the following environment variables:
```
MONGO_URL=your_mongodb_connection_string
PORT=5000
```

## API ENDPOINTS

* GET /: Returns a welcome message.

* POST /api/auth/signup: Sign up a new user.

* POST /api/auth/login: Log in as a user and generate a JWT token.

* GET /api/user/searchUsers: Get the list of users based on the passed keyword in params.

* POST /api/chat/accessChats: returns an object of chat based on people in a one-on-one conversation.If chat object is already there it returns it, if not it gets created and then returned to be accessed

* GET /api/chat/fetchChats: Get the list of chats where the authenticated user has ever been involved.

* GET /api/chat/searchRooms:  Get the list of rooms based on the passed keyword in params.

* POST /api/chat/createRoom: Creates a room based on the name of the room passed in the body of the request, only if room name is unique in the database.

* POST /api/chat/accessRoom: Get the list of users based on the passed keyword in params.

* POST /api/message/sendMessage: ```chatContent```, ```chatId``` is passed into the request body of Post request along with attached file ```contentType``` and attached file ```fileName```. A chat message JSON is returned (along with pre-signed ```putObjectURL``` from AWS if a file is attached).
That pre-signed URL is requested to PUT the file from the front end in the AWS S3 Bucket.

* GET /api/message/fetchAllMessages/:chatId: Fetches all the messages of the passed ```chatId```.

* GET /api/message/fetchPreSignedGetUrl/:fileName: Fetches a pre-signed url from AWS to be accessed in the frontend to get the objects in S3 Bucket

## Middlewares
verifyToken:
This function is a middleware function that hijacks every request made to access any resource and checks if the ```req.header("authorization")``` gives a token back. It then verifies that token with ```jwt.verify()``` and infuse ```req.id``` with ```userId``` of the username and ```req.verified = true```. On failing, ```req.id = null``` and ```req.verified = false``` with a ```req.msg```. Each successive controller receives ```userId``` from this middleWare and checks if the request is verified by this middleware(req.verify==true).

## WebSocket Integration
The app uses Socket.io for real-time communication. Socket.io allows users to join chat rooms and send/receive messages instantly.

## Contributing
Contributions are welcome! Feel free to submit pull requests or open issues if you find any problems or improvements.


