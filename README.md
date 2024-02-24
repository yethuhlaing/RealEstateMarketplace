# Real Estate App Documentation
Welcome to the Real Estate App documentation! This hands-on project is about the Real Estate application, including its features, setup instructions, and usage guidelines.

# Overview
The Real Estate app is a full-stack web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack, along with Tailwind CSS for styling. Firebase is used for Google Authentication with the implementation of MongoDB for user and listings storage. It serves as a platform for users to browse and search for real estate properties, view property details, and contact agents for inquiries.

# Features
- User Authentication: Users can sign up, log in, and log out securely.
- Property Listings: Display a list of available properties with essential details.
- Property Search: Allow users to search for properties based on various criteria (e.g., name, price, property type).
- Property Details: Provide detailed information about each property, including description, images, price, and contact information.
- Contact Agent: Enable users to contact the property agent directly for inquiries or to schedule a viewing.
- Responsive Design: Ensure the application is fully responsive and accessible on different devices.

# Tech Stack
## Frontend:

- React.js
- Tailwind CSS
## Backend:

- Node.js
- Express.js
- MongoDB

# Getting Started
Follow these steps to set up and run the Real Estate app locally on your machine:

1. Clone the Repository: Clone the Real Estate app repository to your local machine using the following command:
   
```
git clone https://github.com/yethuhlaing/RealEstateMarketplace.git
```

2. Install Dependencies: Navigate to the project directory and install the necessary dependencies for both the frontend and backend:
#### Install backend dependencies
```
npm install       
```
#### Install frontend dependencies
```
cd client
```
```
npm install       
```


3. Set Up Environment Variables: Create a .env file and define the following environment variables:
#### In the backend directory
```
MONGO=<Your MongoDB URI>  # MongoDB connection URI
HOST=<Your HOST Address>  
PORT=<Your PORT number> # Port for the backend server
PROTOCOLS=<http or https>
BASE_URL=<PROTOCOLS://HOST:PORT>
JWT_SECRET=<Your JWT Secret Key>  
```
#### In the frontend directory
```
VITE_FIREBASE_API_KEY=<Your FIREBASE URI>  # MongoDB connection URI
```
4. Run the Application: Start the backend server and frontend development server simultaneously:

```
npm run dev
```

