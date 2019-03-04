# Simple photo fetch app Powered by ReactJS+NodeJS+ExpressJS and websockets

This application fetches most recent public photos from Flickr using Flickr API. Photos are displayed in one column and continuously fetched when scrolling down. User is able to sort the photos by title.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

1. Clone the repository
2. Open your beloved package manager and navigate to the root directory
3. Install backend dependencies
```
npm install
```
4. Navigate to frontend folder and install a few more dependencies.
```
cd frontend && npm install
```
5. Return to the root directory and create a file to store environment variables. Name it ".env". This file should contain your private Flickr API access key. Make sure to visit https://www.flickr.com/services/api/misc.api_keys.html, create an account and apply for Flickr API access key. When received, enter it to the ".env" file like this:

```
APIKEY=57hkj3..................
```
6. Launch the app
```
npm run devstart
```
7. Enjoy!

P.S.
There is one slight difference between the current production build and developement build. Before going for a fresh production build edit gallery.js file which is located in frontend/src/components.
Change the 8th line from:
  connection = new WebSocket('ws://localhost:3030/');
to:
  connection = new WebSocket(window.location.origin.replace(/^http/, 'ws'));
