# Candidate Referral Management System

This is a web-based application designed to streamline the process of referring candidates for job positions. It allows users to add candidates, track their application status, and view key metrics through an intuitive dashboard.

## Features

- **User Authentication**: Secure signup and login functionality using JWT (JSON Web Tokens) to protect user sessions.
- **Candidate Referral**: Users can add new candidates with details including name, contact information, job title, and a link to their resume.
- **Status Tracking**: Candidates can be tracked through various stages: "Pending", "Reviewed", "Hired", and "Rejected".
- **Start-up Dashboard**: The dashboard provides a high-level overview of referral activities, displaying total candidates and a breakdown by status.
- **Data Management**: Users have full control to delete candidate records as needed.
- **Responsive Interface**: The application is designed to be fully responsive, ensuring usability across both desktop and mobile devices.

## Local Setup Guide

Follow these steps to run the project locally. Ensure you have Node.js and MongoDB installed on your system.

1.  **Clone the Repository**:
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2.  **Backend Configuration**:
    - Navigate to the backend directory: `cd backend`
    - Install dependencies: `npm install`
    - Create a `.env` file in the `backend` directory with the following variables:
        ```
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_secure_secret_key
        PORT=3000
        ```
    - Start the server: `npm start` (or `npm run dev` for development mode).

3.  **Frontend Configuration**:
    - Open a new terminal window and navigate to the frontend directory: `cd frontend`
    - Install dependencies: `npm install`
    - Create a `.env` file in the `frontend` directory with the following variable:
        ```
        VITE_API_URL=http://localhost:3000
        ```
    - Start the application: `npm run dev`

4.  **Access the Application**:
    - Open your browser and navigate to the local URL provided by Vite (typically `http://localhost:5173`).

## Test Credentials

To quickly test the application without creating a new account, you may use the following credentials:
- **Email**: test@example.com
- **Password**: password123

## Assumptions and Limitations

- **Resume Handling**: The system utilize a URL field for resumes (e.g., links to Google Drive or LinkedIn) rather than direct file uploads. This decision was made to simplify the MVP architecture and avoid third-party storage dependencies for this iteration.
- **Account Recovery**: There is currently no automated password reset functionality. Users must create a new account if credentials are lost.
- **User Roles**: The system operates with a single user role ("Referrer"). Each user has a private view of their own candidates; there is no global admin dashboard implemented at this stage.

## Technology Stack

- **Frontend**: React, Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **Styling**: Vanilla CSS
