import dotenv from "dotenv";
import { Auth, google } from "googleapis";

dotenv.config();

const OAuth = google.Auth.OAuth2Client;

// Set global client here. Set it to null;
let GoogleOAuth2Client: null | Auth.AuthClient = null;
0;
const setUpGoogleAuthClient = () => {
  try {
    GoogleOAuth2Client = new OAuth(
      process.env.GOOGLE_API_CLIENT_ID,
      process.env.GOOGLE_API_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    if (!GoogleOAuth2Client) {
      throw new Error("Error setting up Google auth client");
    }

    /*
      TODO:
        CONSIDER:
          1. Potentially incorporate a refresh token below in the future  
    */
    // GoogleOAuth2Client.setCredentials({
    //   refresh_token: process.env.GOOGLE_API_REFRESH_TOKEN,
    // });
  } catch (err) {
    console.log(`Error setting up Google auth client. Error: ${err}`);
    // Restart server
  }
};

setUpGoogleAuthClient();

export default GoogleOAuth2Client;
