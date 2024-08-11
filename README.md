# AgriConnect

AgriConnect is a web application designed to revolutionize agricultural technology by connecting farmers with workers and providing a platform for renting agricultural machinery. Built on the MERN stack, AgriConnect leverages modern web technologies to offer a seamless experience for farmers and workers alike.

## Table of Contents

- [AgriConnect](#agriconnect)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technology Stack](#technology-stack)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Screenshots](#screenshots)
  - [Deployed Website](#deployed-website)
  - [License](#license)

## Features

- **Hire Workers**: Farmers can post applications to hire workers for specific agricultural tasks. Workers nearby can view the applications, check the rating of the hirer, and send proposals to work.
  
- **Rate & Review**: Both farmers and workers can rate each other after the completion of the work, enhancing future recommendations and helping to maintain a high standard of service.

- **Rent Machinery**: Farmers with adequate machinery can rent it out through the platform. Others in need of machinery can book it based on availability, managing units and freeing them up after use.

- **User Profiles**: Detailed profiles for both farmers and workers, showcasing ratings, past work, and machinery owned or rented.

- **Job Management**: Farmers can manage their job postings, view proposals from workers, and accept or reject proposals based on worker profiles and ratings.

## Technology Stack

- **Frontend**: React, Bootstrap, MaterialUI, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Deployment**: Vercel

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/AgriConnect.git
   cd AgriConnect
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     MONGO_URI=your_mongo_uri
     FRONTEND_URL=http://localhost:3000
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. **Signup/Login**: Users can sign up or log in to the platform using their email and password.
    
2. **Create Job Posting**: Farmers can create job postings by providing details about the work, including the type of work, location, and the number of workers required.
    
3. **Search and Apply for Jobs**: Workers can search for available jobs, view details, and send proposals to work.
    
4. **Rent Machinery**: Farmers can list their machinery for rent, specifying the quantity available. Others can book the machinery as needed.
    
5. **Manage Jobs and Machinery**: Users can manage their job postings and machinery rentals, including updating or deleting them as needed.
    
## Screenshots

1. **Home Page**  
   ![Login/Signup](./client/src/images/home.png)

2. **Login/Signup Page**  
   ![Login/Signup](./client/src/images/login-signup.png)

3. **Profile Page**  
   ![Profile](./client/src/images/profile.png)

3. **Add Machinery**  
   ![Rent Machinery](./client/src/images/add-machinery.png)

4. **Rent Machinery Page**  
   ![Rent Machinery](./client/src/images/rent-machinery.png)

5. **Manage Machinery Page**  
   ![Manage Machinery](./client/src/images/manage-machinery.png)

6. **Create Job Application Page**  
   ![Create Job Application](./client/src/images/create-application.png)

7. **Search Jobs Page**  
   ![Search Jobs](./client/src/images/search-jobs.png)

8. **Manage Created Jobs Page**  
   ![Manage Created Jobs](./client/src/images/manage-created-jobs.png)

9. **Mail service**  
   ![Manage Created Jobs](./client/src/images/mail-service.png)

10. **About Us Page**  
   ![About Us](./client/src/images/about-us.png)
    
## Deployed Website

Check out the live version of AgriConnect: [agri-connect-blitz.vercel.app](https://agri-connect-blitz.vercel.app)

## License

This project is licensed under the Blitz License.