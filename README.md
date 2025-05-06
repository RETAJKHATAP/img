Image Processing Web App
This is a full-stack image processing web application built with Node.js, Express, TypeScript, and Sharp. It allows users to upload .jpg images, resize them through a simple interface, and display processed images dynamically.

Project Structure
The project is organized as follows:

public/: Frontend (HTML, JS, CSS)

src/: Backend source code (TypeScript)

routes/: API routes

controllers/: Logic handlers

utils/: Utility functions (e.g., image resizing)

spec/: Unit and integration tests

images/:

full/: Original uploaded images

thumb/: Processed/resized images

dist/: Compiled JavaScript code

package.json

tsconfig.json

Features
Upload .jpg images using a drag & drop form.

Display uploaded images in a dynamic gallery.

Resize selected images using a simple input form.

Automatically cache and retrieve resized images.

Responsive frontend interface (no page refresh required).

Input validation and descriptive error handling.

Unit and API tests using Jasmine and SuperTest.

Technologies Used
Node.js

Express

TypeScript

Sharp

Multer (for image upload)

Jasmine & SuperTest (for testing)

Prettier & ESLint (for formatting and linting)

Available Scripts
npm run build – Compile TypeScript files

npm start – Start the Express server

npm run test – Run unit and integration tests

npm run lint – Run ESLint for code quality

npm run prettify – Format code using Prettier

Testing
Tests are included for:

API endpoints (/api/images, /api/upload)

Image processing utility (resizeImage)

Input validation

To run the tests, use:
npm run test

How to Run the App
Install dependencies:
npm install

Build the TypeScript files:
npm run build

Start the server:
npm start

Open your browser and go to:
http://localhost:8000

Example Usage
Resize an image using a URL like:
http://localhost:8000/api/images?filename=example.jpg&width=300&height=200

Upload a new image using the form, and it will instantly appear in the gallery without refreshing the page.

Notes
Only .jpg and .jpeg files are allowed.

Uploaded images are saved in images/full/.

Resized images are saved in images/thumb/ and reused on repeated requests.

Developed with passion by Retaj Khattab

