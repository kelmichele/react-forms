const AWS = require('aws-sdk'); // Load the SDK for JavaScript
const mailer = require("./mailer");
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

AWS.config.update({region: 'us-east-1'}); // Set the region that you configured in AWS

// Our end-point for handling the enquiry request
app.post('/api/contact', (req, res, next) => {
  return mailer.sendMail('kelli@hsdesignhouse.com', ['kelli@hsdesignhouse.com'], req.body)
    .then(() => res.send(req.body))
    .catch(next);
});

app.listen(port, () => console.log(`Listening on port ${port}`));