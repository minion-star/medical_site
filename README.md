# Medical Dashboard & Report

This repository contains a Medical Dashboard and Reporting system built with React, TypeScript, and Material-UI (MUI). It provides an interactive and user-friendly interface for managing patient data, generating reports, and visualizing medical information.

## Features
- User authentication with JWT
- Patient data management
- Interactive charts and reports
- Secure API integration
- Responsive UI with Material-UI

## Tech Stack
- **Frontend:** React, TypeScript, Material-UI (MUI)
- **Backend:** Express.js, Node.js
- **Database:** MySQL
- **Authentication:** JWT

## Installation

### Prerequisites
- Node.js & npm installed
- MySQL database setup

### Setup
```sh
# Clone the repository
git clone <repository-url>
cd medical-dashboard

# Install dependencies
npm install

# Start the backend server
cd backend
npm start

# Start the frontend application
cd ../frontend
npm start
```

## Usage
1. Sign in with your credentials.
2. View and manage patient records.
3. Generate reports and visualize data.

## API Endpoints
- `POST /signin` - User authentication
- `GET /patients` - Fetch patient data
- `POST /patients` - Add new patient data
- `PUT /patients/:id` - Update patient information
- `DELETE /patients/:id` - Remove a patient record

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.
