require("dotenv").config(); // Ensure this is at the very top

const sgMail = require("@sendgrid/mail");
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

// Configuration
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const EMAIL_FROM = "hello@ethrome.org";
const EMAIL_SUBJECT = "[ETHRome] Get your ticket!";

sgMail.setApiKey(SENDGRID_API_KEY);

// Read the CSV file
function readEmailsFromCsv(filePath) {
  return new Promise((resolve, reject) => {
    const emails = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        emails.push(row.email);
      })
      .on("end", () => {
        resolve(emails);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

// Read the HTML template
function readHtmlTemplate(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

// Create the email content
function createEmailContent(toEmail, htmlTemplate) {
  return {
    to: toEmail,
    from: EMAIL_FROM,
    subject: EMAIL_SUBJECT,
    html: htmlTemplate,
  };
}

// Send the email
async function sendEmail(emailContent) {
  try {
    await sgMail.send(emailContent);
    console.log(`Email sent to ${emailContent.to}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Main function
async function main(csvFilePath, htmlTemplatePath) {
  try {
    const emails = await readEmailsFromCsv(csvFilePath);
    console.log(emails);
    const htmlTemplate = await readHtmlTemplate(htmlTemplatePath);
    for (const email of emails) {
      const emailContent = createEmailContent(email, htmlTemplate);
      await sendEmail(emailContent);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

const csvFilePath = path.join(__dirname, "emails.csv");
const htmlTemplatePath = path.join(__dirname, "template.html");

main(csvFilePath, htmlTemplatePath);
