# Image Processing Web App

This is an image processing web application that allows users to resize and upload images. The app consists of a backend API built with Express.js and a frontend user interface implemented using HTML, CSS, and JavaScript.

## Features

View a gallery of available images
Resize images by specifying custom width and height
Upload new images in JPG or JPEG format
Backend API for image processing and serving resized images
Frontend user interface for interacting with the API

## Installation

Clone the repository:
`git clone https://github.com/Dhadhazi/Image-Processing-Web-App.git`

Navigate to the project directory:
`cd image-processing-web-app`

Install the dependencies:
`npm install`

Start the development server:
`npm start`

Open your web browser and visit http://localhost:8000 to access the application, or open the html file in the /public folder

## Usage for /public

Viewing Images

- The home page displays a gallery of available images.
- Click on an image to select it for resizing.

Resizing Images

- Select an image from the gallery or the dropdown menu.
- Enter the desired width and height for the resized image.
- Click the "Resize" button to generate the resized image.
- The URL of the resized image will be displayed below the form.

Uploading Images

- Click on the "Choose File" button in the upload section.
- Select a JPG or JPEG image file from your local machine.
- Click the "Upload" button to upload the image to the server.
- The uploaded image will be added to the gallery and available for resizing.

API Endpoints

- GET /images: Retrieves a list of available images.
- GET /images/:imageName: Retrieves a specific image by name.
  - Query parameters:
    - w: Width of the resized image (optional)
    - h: Height of the resized image (optional)
  - Example: http://localhost:8000/images/fjord.jpg?w=200&h=800
- POST /upload: Uploads a new image file.

## Project Structure

src/
├── controllers/
│ ├── ImagesController.ts
│ ├── IndexController.ts
│ └── UploadController.ts
├── images/
│ ├── original/
│ └── thumbnails/
├── tests/
│ ├── helpers/
│ ├── ImagesController.test.ts
│ ├── IndexController.test.ts
│ ├── UploadController.test.ts
│ ├── UtilFileExist.test.ts
│ ├── UtilGenerateFileName.test.ts
│ └── UtilResizeImage.test.ts
├── utils/
│ ├── fileExist.ts
│ ├── generateFileName.ts
│ └── resizeImage.ts
├── app.ts
├── config.ts
├── index.ts
└── routes.ts
public/
├── index.html
├── script.js
└── style.css

The `src` directory contains the backend source code.
The `public` directory contains the frontend files.
The `controllers` directory contains the route handlers for different endpoints.
The `images` directory stores the original and resized images.
The `tests` directory contains the unit tests for the backend code.
The `utils` directory contains utility functions used in the backend.

## License

This project is licensed under the MIT License.
