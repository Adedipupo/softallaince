
# Softallaince API

## Features
1. **Register User**
2. **Login User**
3. **Forgot Password**
4. **Recover Password**
5. **Resend Auth Code with Expiration**
6. **Get User**: (Requires authentication)
7. **CRUD API for Inventory Management**: (Requires authentication)
8. **Payments API**: Integration with Paystack or Flutterwave (FLW) for payment processing.
9. **Webhook for Purchase Status**: Marks the status of purchased goods and services as 'paid' via a webhook.

## Table of Contents
- [Setup Locally](#setup-locally)
- [Required Environment Variables](#required-environment-variables)
- [Running the Application Using Docker](#running-the-application-using-docker)

## Setup Locally

To set up the application on your local machine, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/Adedipupo/softallaince.git
cd softallaince

### 2. Install dependencies

yarn install

### 3. Set Up Environment Variables

# MongoDB
MONGO_URI=mongodb://localhost:27017/softallaince

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Email Configuration (For Password Recovery)
EMAIL_HOST=smtp.yourmailserver.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password

PAYSTACK_SECRET_KEY=
PAYSTACK_PUBLIC_KEY=
PAYSTACK_WEBHOOK_SECRET=https://943f-102-88-82-131.ngrok-free.app/api/v1/payment/webhook/paystack


### 4. Run the Application Locally

yarn dev

# Running the Application Using Docker

yarn docker:build


yarn docker:up


docker run -p 3000:3000 softallaince-softallainceapi




