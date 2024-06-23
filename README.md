# Integration of Generative AI for Prompt-Based Report Delivery in an Accounting Platform

## Overview

This project integrates Generative AI (Gen-AI) into an accounting platform to enable prompt-based report delivery. Users can generate customized reports using natural language queries. The system ensures data privacy by restricting data access to authorized users only. The project consists of three main components: Frontend, ServiceLayer, and DBLayer.

## Features

- **User Authentication:** Secure login page for users.
- **Report Generation:** Generate customized reports using natural language or voice queries.
- **Report History:** View history of generated reports.
- **Download Reports:** Users can download the generated reports.
- **Data Privacy:** Ensures data access is restricted to authorized users only.
- **Comprehensive Testing:** Includes tests to cover all major functionalities and edge cases.

## Project Structure

.
├── Frontend
│ ├── src
│ ├── public
│ ├── package.json
│ ├── README.md
│ └── ...
├── ServiceLayer
│ ├── src
│ ├── package.json
│ ├── README.md
│ └── ...
├── DBLayer
│ ├── src
│ ├── package.json
│ ├── README.md
│ └── ...
├── README.md
└── ...

markdown
Copy code

### Frontend

The frontend application, built with React, allows users to log in, generate reports, and view the history of generated reports. Reports can be generated using both text and voice queries and can be downloaded.

#### Key Features:
- Login Page
- Generate Report Page
- Report History Page
- Voice-Based Report Generation
- Download Reports

### ServiceLayer

The service layer, built with Node.js, acts as an intermediary between the frontend and the Gen-AI model. It processes user queries, interacts with the Gen-AI model, and retrieves the required data from the database.

#### Key Features:
- Query Processing
- Interaction with Gen-AI Model
- Data Retrieval and Filtering

### DBLayer

The database layer, built with Spring Boot and PostgreSQL, ensures secure storage and retrieval of data. It supports multiple microservices to interact with the database securely.

#### Key Features:
- Secure Data Storage
- Data Retrieval Services
- Microservices Architecture

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Java (for Spring Boot)
- PostgreSQL
- Docker (optional, for containerization)

### Installation

1. Clone the repository:

bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
Install dependencies for each component:
bash
Copy code
# Frontend
cd Frontend
npm install

# ServiceLayer
cd ../ServiceLayer
npm install

# DBLayer
cd ../DBLayer
./mvnw install
Set up the PostgreSQL database:
sql
Copy code
CREATE DATABASE yourdatabase;
CREATE USER youruser WITH ENCRYPTED PASSWORD 'yourpassword';
GRANT ALL PRIVILEGES ON DATABASE yourdatabase TO youruser;
Update the application.properties file in DBLayer/src/main/resources with your PostgreSQL configurations.

Running the Application
Start the database layer:
bash
Copy code
cd DBLayer
./mvnw spring-boot:run
Start the service layer:
bash
Copy code
cd ../ServiceLayer
npm start
Start the frontend application:
bash
Copy code
cd ../Frontend
npm start
Testing
Run the tests for each component to ensure everything is working correctly:

bash
Copy code
# Frontend
cd Frontend
npm test

# ServiceLayer
cd ../ServiceLayer
npm test

# DBLayer
cd ../DBLayer
./mvnw test
Deployment

Include deployment instructions here, whether it's on a cloud service, a specific server, or using Docker.

Contributing

We welcome contributions to enhance the functionality and fix any issues. Please follow the standard guidelines for submitting pull requests.

License

This project is licensed under the MIT License - see the LICENSE file for details.

Contact

For any questions or inquiries, please contact us at:

Email: hackathon@formidium.com
Address: J-5 and J-15, Ajmer Rd, J Block, Tagore Nagar, Jaipur, Rajasthan, 302021
©2024 by Formidium Corp. All rights reserved.