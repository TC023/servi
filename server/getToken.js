// getToken.js
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

const CREDENTIALS_PATH = '../env/client_secret_195575088614-lsu4amvphautte6ul6k6t7tued9coa1g.apps.googleusercontent.com.json';
const TOKEN_PATH = '../env/token.json';
const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

/**
 * Generates an authentication URL for user consent.
 * @returns {string} The URL to visit for authentication.
 */
const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
const { client_secret, client_id, redirect_uris } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
/**
 * Prompts the user to enter the authorization code received.
 * @param {string} query The message to display to the user.
 * @param {function} callback Function to call with the entered code.
 */

const authUrl = oAuth2Client.generateAuthUrl({
/**
 * Exchanges the code for an access token and writes it to a file.
 * @param {string} code The authorization code received from the server.
 * @param {function} callback Callback function to handle the token or any errors.
 */
  access_type: 'offline',
  scope: SCOPES,
});

console.log('Authorize this app by visiting this URL:', authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter the code from that page here: ', (code) => {
  rl.close();
  oAuth2Client.getToken(code, (err, token) => {
    if (err) return console.error('Error retrieving access token', err);
    oAuth2Client.setCredentials(token);
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
    console.log('Token stored to', TOKEN_PATH);
  });
});
