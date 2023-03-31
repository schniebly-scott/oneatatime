/* import { google } from 'googleapis';
import $ from 'jquery';

let client: any;
function initClient() {
    client = google.accounts.oauth2.initCodeClient({
        client_id: 'YOUR_CLIENT_ID',
        scope: 'https://www.googleapis.com/auth/calendar.readonly',
        ux_mode: 'popup',
        callback: (response: any) => {
            const code_receiver_uri = 'YOUR_AUTHORIZATION_CODE_ENDPOINT_URI';

            // Send auth code to your backend platform
            const xhr = new XMLHttpRequest();
            xhr.open('POST', code_receiver_uri, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.onload = function () {
                console.log('Signed in as: ' + xhr.responseText);
            };
            xhr.send('code=' + response.code);

            // After receipt, the code is exchanged for an access token and
            // refresh token, and the platform then updates this web app
            // running in user's browser with the requested calendar info.
        },
    });
}

function getAuthCode() {
    // Request authorization code and obtain user consent
    client.requestCode();
}


$.getScript('https://accounts.google.com/gsi/client')
    .done(() => {
        initClient();
    }); */



/* import fs from 'fs';
import path from 'path';
import http from 'http';
import url from 'url';
import opn from 'open';
import destroyer from 'server-destroy';

import { google } from 'googleapis';
const people = google.people('v1');

const keyPath = path.join(__dirname, 'client_id.json');
let keys: any = {redirect_uris: ['']};
if (fs.existsSync(keyPath)) {
  keys = require(keyPath).web;
}

const oauth2Client = new google.auth.OAuth2(
  keys.client_id,
  keys.client_secret,
  keys.redirect_uris[0]
);

google.options({auth: oauth2Client});

async function authenticate(scopes: any) {
  return new Promise((resolve, reject) => {
    // grab the url that will be used for authorization
    const authorizeUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes.join(' '),
    });
    const server = http
      .createServer(async (req, res) => {
        try {
          if (req.url.indexOf('/oauth2callback') > -1) {
            const qs = new url.URL(req.url, 'http://localhost:3000')
              .searchParams;
            res.end('Authentication successful! Please return to the console.');
            server.destroy();
            const {tokens} = await oauth2Client.getToken(qs.get('code'));
            oauth2Client.credentials = tokens; // eslint-disable-line require-atomic-updates
            resolve(oauth2Client);
          }
        } catch (e) {
          reject(e);
        }
      })
      .listen(3000, () => {
        // open the browser to the authorize url to start the workflow
        opn(authorizeUrl, {wait: false}).then(cp => cp.unref());
      });
    destroyer(server);
  });
}

async function runSample() {
  // retrieve user profile
  const res = await people.people.get({
    resourceName: 'people/me',
    personFields: 'emailAddresses',
  });
  console.log(res.data);
}

const scopes = [
  'https://www.googleapis.com/auth/contacts.readonly',
  'https://www.googleapis.com/auth/user.emails.read',
  'profile',
];
authenticate(scopes)
  .then(client => runSample(client))
  .catch(console.error);
 */


/* import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

async function authorize(): Promise<OAuth2Client> {
  const { client_secret, client_id, redirect_uris } = require('./client_id.json').web;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar.events'],
  });
  console.log(`Authorize this app by visiting this URL: ${authUrl}`);

  

  oAuth2Client.setCredentials(credentials);
  return oAuth2Client;
}

async function GetRefreshToken(token) {
    let refreshToken= await oAuth2Client.getToken(token);
    return refreshToken;
} */



/* import React from 'react';
import ApiCalendar from 'react-google-calendar-api';

const config = {
    "clientId": "212061092710-00a3iamutj4kodq42fpo6e5is2mbfpq3.apps.googleusercontent.com",
    "apiKey": "AIzaSyDnHNNarh7NKrxyVkk7zq8wE5j9OvT-tGM",
    "scope": "https://www.googleapis.com/auth/calendar",
    "discoveryDocs": [
        "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
    ]
}

const apiCalendar = new ApiCalendar(config)
*/

/* 
import { calendar_v3, google } from 'googleapis';
import { Credentials, OAuth2Client } from 'google-auth-library';
import Calendar = calendar_v3.Calendar;
import Schema$Event = calendar_v3.Schema$Event;
import { Callbacks } from 'jquery';

const { client_secret, client_id, redirect_uris } = require('./client_id.json').web;

class GoogleCalendar {
  private readonly SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
  private readonly DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
  private readonly MAX_RESULTS = 10;

  private readonly oauth2Client: OAuth2Client;


  constructor() {
    this.oauth2Client = new google.auth.OAuth2(client_id, client_secret);
  }

  async getAuthorizationUrl(): Promise<string> {
    const url = this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: this.SCOPES,
    });

    return url;
  }

  async setCredentials(code: string): Promise<void> {
    const { tokens } = await this.oauth2Client.getToken(code);
    this.oauth2Client.setCredentials(tokens);
  }

  async getUpcomingEvents(): Promise<Schema$Event[] | undefined> {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: this.MAX_RESULTS,
      orderBy: 'startTime',
    });

    return response.data.items;
  }

  async handleAuthClick(): Promise<any> {
    const authUrl: string = await this.getAuthorizationUrl();
    const consent = window.open(authUrl);
    if (consent?.closed) {
      console.log(consent.location.href);
    }
  }
}

export default GoogleCalendar;
 */


//External imports
/* import { useEffect, useRef } from 'react'

  const loadScript = (src: any) =>
  new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve()
    const script = document.createElement('script')
    script.src = src
    script.onload = () => resolve()
    script.onerror = (err) => reject(err)
    document.body.appendChild(script)
  })

const GoogleAuth = () => {

  const googleButton = useRef(null);

  useEffect(() => {
    const src = 'https://accounts.google.com/gsi/client'
    const id = "< your ID here ;) >"

    loadScript(src)
      .then(() => {
        
        console.log(google)
        google.accounts.id.initialize({
          client_id: id,
          callback: handleCredentialResponse,
        })
        google.accounts.id.renderButton(
          googleButton.current, 
          { theme: 'outline', size: 'large' } 
        )
      })
      .catch(console.error)

    return () => {
      const scriptTag = document.querySelector(`script[src="${src}"]`)
      if (scriptTag) document.body.removeChild(scriptTag)
    }
  }, [])

  function handleCredentialResponse(response: { credential: string }) {
    console.log("Encoded JWT ID token: " + response.credential);
  }

  return (
    <div ref={googleButton}></div>
  )
}

export default GoogleAuth */

export {};