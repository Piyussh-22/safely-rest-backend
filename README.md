SafelyRest – Find Your Perfect Stay, Safely and Seamlessly

SafelyRest is a full-stack accommodation booking platform built with the MERN stack (MongoDB, Express, React, Node.js).
It allows users to discover, host, and manage rental houses with Google authentication, role-based access, and Cloudinary image uploads.

Key Features
Authentication
Secure JWT authentication with Google login support
Role-based access: Guest, Host, and Admin
Guest Experience
Browse houses by location and price
View detailed house information
Add houses to favourites (requires login)

Host Features
Add new houses with images uploaded via Cloudinary
Manage listed houses from the Host Dashboard
Admin Portal
Restricted access with hardcoded admin credentials
View overall platform metrics in the Admin Dashboard
Backend and API
RESTful API using Express.js
MongoDB (via Mongoose) for all data models
Centralized error handling and request validation
CORS setup for secure cross-origin requests
Other Highlights
Fully responsive frontend using Tailwind CSS and Lucide icons
Light/Dark theme support
Deployed backend (Render) and frontend (Netlify/Vercel)

Tech Stack
Layer	Technologies Used
Frontend	React.js, Redux Toolkit, Tailwind CSS
Backend	Node.js, Express.js
Database	MongoDB (Mongoose ORM)
Authentication	JWT, Google OAuth 2.0
Image Handling	Cloudinary + Multer
Deployment	Render (Backend), Vercel/Netlify (Frontend)
Setup Instructions
Clone the Repository
git clone https://github.com/Piyussh-22/SafelyRest-Development.git
cd SafelyRest-Development

Setup Backend
cd Backend
npm install
npm run start


Create a .env file inside /Backend with:

MONGODB_URI=your_mongodb_uri
PORT=4000
FRONTEND_URL=http://localhost:5173
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_secret
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=admin@gmail.com

Setup Frontend
cd ../Frontend
npm install
npm run dev

Screenshots (Optional)

Add screenshots after hosting:

/public/screenshots/
 ├── home.png
 ├── house-details.png
 ├── host-dashboard.png
 └── admin-dashboard.png

Deployment
Backend: Render
Frontend: Netlify or Vercel
CORS and environment variables configured for production

Project Structure
SafelyRest-Development/
│
├── Backend/
│   ├── src/
│   ├── .env
│   ├── app.js
│   └── package.json
│
├── Frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md

Developer

Piyush Raj
Full-Stack Developer (MERN)
GitHub: Piyussh-22

LinkedIn: https://www.linkedin.com/in/piyush-raj-tech/
