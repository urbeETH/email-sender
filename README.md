# URBE Mails

This repository is designed to send emails using SendGrid based on a list of email addresses provided in a CSV file. The email content is generated from an HTML template.

## Prerequisites

- Node.js installed on your machine
- A SendGrid account and API key

## Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/urbe-mails.git
    cd urbe-mails
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory of the project and add your SendGrid API key:
    ```env
    SENDGRID_API_KEY=your_sendgrid_api_key
    ```

4. Prepare your `emails.csv` file in the root directory. The CSV file should have the following structure:
    ```csv
    email
    example1@example.com
    example2@example.com
    ```

5. Prepare your `template.html` file in the root directory. This file will be used as the HTML template for the emails.

## Usage

To send the emails, run the following command:

```
npm run start
```
or
```
node index.js
```