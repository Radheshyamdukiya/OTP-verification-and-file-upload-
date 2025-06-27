# OTP Verification and File Upload using Node.js

This is a Node.js-based backend project that provides two key features:
1. Email-based OTP Verification
2. File Upload with User Profile

Built using Express.js, MongoDB, EJS templating, and core Node libraries like Nodemailer and Multer.

## Features

- Email OTP system with automatic OTP expiry after 200 seconds
- Sends OTP via Gmail using Nodemailer
- File upload functionality using Multer
- Stores uploaded file details and user name in MongoDB
- EJS-based views for forms and display
- Uses separate ports for OTP and Upload servers

## Technologies Used

- Node.js
- Express.js
- MongoDB + Mongoose
- Multer (for file upload)
- Nodemailer (for sending email)
- EJS (for frontend rendering)
- Tailwind or Custom CSS (optional)

## How to Run

1. Clone the repository:
   git clone https://github.com/Radheshyamdukiya/OTP-verification-and-file-upload

2. Navigate to project folder and install dependencies:
   npm install

3. Set up a `.env` file with necessary credentials:
   - Gmail app password
   - MongoDB URI

4. Run both servers (you can split them or merge into one):
   node sendEmail.js
   node upload.js

5. Visit:
   - `http://localhost:4000/user/login` for OTP login
   - `http://localhost:3000/user/profile` for file upload

## Folder Structure

- sendEmail.js – Handles OTP generation and email verification
- upload.js – Handles file upload and profile save
- views/ – EJS templates for forms and profile page
- upload/ – Directory where uploaded files are stored

## Improvements Suggested

- Merge both features into one Express app for better manageability
- Add frontend validation and input checks
- Protect email credentials using environment variables
- Add OTP expiry message and UI feedback
- Use separate routes and controllers for cleaner code structure

## Author

Developed by Radheshyam Dukiya