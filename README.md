# com3014_frontend

The frontend application for the cat image sharing app, built on vite + vue.js

## Overview

This is the frontend application that the user interacts with, connecting the other services together so that they can be used and interacted with, The app includes the following features:

- Registering a new profile
- Logging in and out of your profile (utilizing Authentication and Profile services)
- Sidebar Navigation
- Upload your own images (through the Image service)
- Viewing  your uploaded images in your profile page
- Searching for other profiles by their user id
- Following other users
- Viewing  followed users# pictures on your home page

*Note: Additional features like changing your profile picture and liking images are planned but not fully implemented.*

## Usage

### Docker

Docker must be installed on the system. Run `docker-compose up --build` from the root of the repository. Once running, the service is accessible on the localhost:4173.

### Local Development

Alternativaly the app can be started by running the following commands: 
`npm install` 
`npm run build` 
`npm run serve`

## Tests

Tests are run using Vitest. To run the tests, use the following command:
`npm run test`
