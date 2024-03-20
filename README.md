# Image Processing API

An image processing API that would be good as a microservice with some upgrade. 

## Scripts

npm test -> To run the tests
npm start -> To start the app
npm build -> To build the app

## Endpoints

- /
  - endpoint for health checking, always returns 200 code (example: http://localhost:8000/)
- /images
  - adding file name gets the file (images/fjord.jpg)
  - can generate any size of the file by adding queries:
    - h=200 will resize the image to 200 height
    - w=200 will resize the image to 200 width
    - h=200&w=200 will resize the image the 200 width and 200 height
    - _example_: images/fjord.jpg?w=200&h=200
    - if the image already exists in that size it serves the image
    - converted image name: FILENAME-w(SIZE)-h(SIZE) only adds -w or -h if it is modified
- /uploads
  - ability to upload images, no verification


Example with url: http://localhost:8000/images/fjord.jpg?w=200&h=800