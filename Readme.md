# Node.js MSSQL App

## Overview
A simple Node.js application that connects to an MS SQL database, retrieves data, and serves it via RESTful APIs.

## Features
- Secure connection to MS SQL database.
- RESTful API to fetch user data.
- Automated deployment to Azure Web App via GitHub Actions.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/nodejs-mssql-app.git

2. ## DB

CREATE TABLE Users (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(50) NOT NULL,
    Email VARCHAR(50) NOT NULL
);
